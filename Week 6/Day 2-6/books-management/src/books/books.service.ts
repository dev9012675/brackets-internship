import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from 'src/books/book.schema';
import { Model } from 'mongoose';
import { CreateBookDTO } from './dtos/CreateBookDTO';
import { Author } from 'src/authors/author.schema';
import { UpdateBookDTO } from './dtos/UpdateBookDTO';
import { SearchDTO } from './dtos/SearchDTO';

@Injectable()
export class BooksService {
    constructor(@InjectModel(Book.name) private bookModel:Model<Book> ,
    @InjectModel(Author.name) private authorModel:Model<Author> ,){}

    async create(book:CreateBookDTO) {
        const session = await this.bookModel.db.startSession();
        session.startTransaction();
        
        try {
           
            const validAuthors = await this.authorModel.find({ '_id': { $in: book.authors } });
            if (!validAuthors || validAuthors.length !== book.authors.length) {
                throw new NotFoundException("Author not found");
            }
    
            const createdBook = new this.bookModel(book);
            const savedBook = await createdBook.save({ session });
     
            await this.authorModel.updateMany(
                { _id: {$in:book.authors} },
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
        if(typeof book.authors !== `undefined`){
            const session = await this.bookModel.db.startSession();
            session.startTransaction();
            try {
                const bookToBeUpdated = await this.bookModel.findById(id).session(session);
                const authors = await this.authorModel.find({ '_id': { $in: book.authors } }).session(session);
                if(!book)
                {
                    throw new NotFoundException("Book not found");
                }
                if (!authors || authors.length !== book.authors.length) {
                    throw new NotFoundException("Author not found");
                }
                await this.authorModel.updateMany({ _id: {$in:bookToBeUpdated.authors} } ,
                    {$pull:{books:bookToBeUpdated._id}} , {session}
                )

                const updatedBook =  await this.bookModel.findByIdAndUpdate(id , book , {new:true} ).session(session)
         
                await this.authorModel.updateMany(
                    { _id: {$in:book.authors} },
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
      

    async findAll(searchDTO:SearchDTO){
        if(typeof searchDTO.search !== `undefined`) {
            return await this.bookModel.find({$text:{$search: searchDTO.search}}).populate(`authors`)
        }
        else {
        return await this.bookModel.find().populate(`authors`)
        }
    }

    async findOne(id:string) {
       return await this.bookModel.findById(id).populate(`authors`)
    }

    async countByGenre(){
        return await this.bookModel.aggregate([
            {$unwind:"$genres"} ,
            {$group:{_id:"$genres" , count:{$sum:1}}} ,
            {$project:{_id:false ,genre:"$_id" , count:1}}

        ])
    }

      

    async remove(id:string) {
        const book = await this.bookModel.findById(id)
        if(!book){
            throw new NotFoundException("Book not found")
        }
        await this.authorModel.updateMany({ _id: {$in:book.authors} }  ,
            {$pull:{books:book._id}} 
        )
        await book.deleteOne()
        return {message:"Book deleted successfully"}

    }
        
}
