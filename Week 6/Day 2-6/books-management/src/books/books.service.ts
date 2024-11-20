import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from 'src/books/book.schema';
import { Model } from 'mongoose';
import { CreateBookDTO } from './dtos/CreateBookDTO';
import { Author } from 'src/authors/author.schema';
import { UpdateBookDTO } from './dtos/UpdateBookDTO';

@Injectable()
export class BooksService {
    constructor(@InjectModel(Book.name) private bookModel:Model<Book> ,
    @InjectModel(Author.name) private authorModel:Model<Author> ,){}

    async create(book:CreateBookDTO) {
        const session = await this.bookModel.db.startSession();
        session.startTransaction();
        
        try {
           
            const author = await this.authorModel.findById(book.author).session(session);
            if (!author) {
                throw new NotFoundException("Author not found");
            }
    
            const createdBook = new this.bookModel(book);
            const savedBook = await createdBook.save({ session });
     
            await this.authorModel.updateOne(
                { _id: book.author },
                { $addToSet: { books: savedBook._id } },
                { session } 
            );
    
           
            await session.commitTransaction();
            session.endSession();
    
            return {message:"Book created successfully"}
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error; 
        }
    }

    async update(id:string , book:UpdateBookDTO){
        if(typeof book.author !== `undefined`){
            const session = await this.bookModel.db.startSession();
            session.startTransaction();
            try {
                const bookToBeUpdated = await this.bookModel.findById(id).session(session);
                const author = await this.authorModel.findById(book.author).session(session);
                if(!book)
                {
                    throw new NotFoundException("Book not found");
                }
                if (!author) {
                    throw new NotFoundException("Author not found");
                }
                await this.authorModel.updateOne({_id:bookToBeUpdated.author} ,
                    {$pull:{books:bookToBeUpdated._id}} , {session}
                )

                const updatedBook =  await this.bookModel.findByIdAndUpdate(id , book , {new:true} ).session(session)
         
                await this.authorModel.updateOne(
                    { _id: book.author },
                    { $addToSet: { books: updatedBook._id } },
                    { session } 
                );
        
               
                await session.commitTransaction();
                session.endSession();
        
                return updatedBook; 
            } catch (error) {
                await session.abortTransaction();
                session.endSession();
                throw error; 
            }
        }
        else {
            const updatedBook = await this.bookModel.findByIdAndUpdate(id , book , {new:true})
            if(!updatedBook) {
                throw new NotFoundException("Book not found")
            }
            return updatedBook
        }

    }

    async findAll(){
        return await this.bookModel.find().populate(`author`)
    }

    async findOne(id:string) {
       return await this.bookModel.findById(id).populate(`author`)
    }

    async remove(id:string) {
        const book = await this.bookModel.findById(id)
        if(!book){
            throw new NotFoundException("Book not found")
        }
        await this.authorModel.updateOne({_id:book.author} ,
            {$pull:{books:book._id}} 
        )
        await book.deleteOne()
        return {message:"Book deleted successfully"}

    }
}
