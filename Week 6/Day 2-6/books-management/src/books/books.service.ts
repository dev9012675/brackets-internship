import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './book.schema';
import { Model } from 'mongoose';
import { CreateBookDTO } from './dtos/CreateBookDTO';
import { Author } from '../authors/author.schema';
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
           
            const validAuthors = await this.authorModel.find({ '_id': { $in: book.authors } }).session(session);
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
            return {message:"Book created successfully"}
        } catch (error) {
            await session.abortTransaction();
            throw error; 
        } finally {
            await session.endSession();
        }
    }



    async update(id:string , book:UpdateBookDTO){
        const bookToBeUpdated = await this.bookModel.findById(id);
        if(!bookToBeUpdated)
        {
            throw new NotFoundException("Book not found");
        }
        if(book.authors !== null && book.authors.length !== 0 ){
            const session = await this.bookModel.db.startSession();
            session.startTransaction();
            try {
                
                const authors = await this.authorModel.find({ '_id': { $in: book.authors } }).session(session);
                if ( authors.length !== book.authors.length) {
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
        
               
                await session.commitTransaction()
        
                return {
                    message:"Book updated successfully." ,
                    data:updatedBook
                }; 
            } catch (error) {
                await session.abortTransaction();
                throw error; 
            } finally {
                await session.endSession();
            }
        }
        else {
            const updatedBook = await this.bookModel.findByIdAndUpdate(id , book , {new:true})
            return {
                message:"Book updated successfully." ,
                data:updatedBook
            }
        }

    }
      

    async findMultiple(searchDTO:SearchDTO){
        try {
        const textFilter = searchDTO.search ? { $text: { $search: searchDTO.search } } : {}; 
        const genreFilter = searchDTO.genre ? {genres:searchDTO.genre}: {};
        const limit = searchDTO.limit ? searchDTO.limit : 5
        const skip = searchDTO.page ? (searchDTO.page - 1)*limit : 0
        let message:string = "Books fetched successfully"
        
        
        const query ={...textFilter , ...genreFilter}
        //const books = await this.bookModel.find(query).populate('authors');
        const books = await this.bookModel.aggregate([
            {
                $match: query
            } ,
            {
               $lookup : {
                     from: "authors" ,
                     localField:"authors" ,
                     foreignField: `_id` ,
                     as: "authors_data"



               }
            } ,
           
            {
                $skip:skip
            } ,
            {
                $limit:limit
            }
        ])
        if(books.length === 0) {
            message = `No books found`
        }
        return {
            message: message,
            data: books
        }
        }catch(error) {
            throw error
        }
    }

    async findOne(id:string) {
        try {
       const book = await this.bookModel.findById(id).populate(`authors`)
       if(!book) {
        throw new NotFoundException("Book not found")
       }
       
       return {
        message:"Book fetched successfully" ,
        data:book
       }
     }catch(error) {
        throw error
     }
    }

    async countByGenre(){
        try{
        return await this.bookModel.aggregate([
            {$unwind:"$genres"} ,
            {$group:{_id:"$genres" , count:{$sum:1}}} ,
            {$project:{_id:false ,genre:"$_id" , count:1}}

        ])
        }
        catch(error){
            throw error
        }
    }

      

    async remove(id:string) {
        const session = await this.bookModel.db.startSession();
        session.startTransaction()
        try{
        const book = await this.bookModel.findById(id).session(session)
        if(!book){
            throw new NotFoundException("Book not found")
        }
        await this.authorModel.updateMany({ _id: {$in:book.authors} }  ,
            {$pull:{books:book._id}  } ,{session}
        )
        await book.deleteOne().session(session)
        await session.commitTransaction();
        return {message:"Book deleted successfully"}
    }
    catch(error){
        await session.abortTransaction();
        throw error; 
    }
    finally {
        await session.endSession();
    }

    }
        
}
