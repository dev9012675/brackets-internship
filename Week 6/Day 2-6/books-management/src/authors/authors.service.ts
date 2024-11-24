import {  Injectable, NotFoundException } from '@nestjs/common';
import { Author } from './author.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthorDTO } from './dtos/CreateAuthorDTO';
import { UpdateAuthorDTO } from './dtos/UpdateAuthorDTO';
import { Book } from '../books/book.schema';
import { AuthorSearchDTO } from './dtos/AuthorSearchDTO';

@Injectable()
export class AuthorsService {
    constructor(@InjectModel(Author.name) private authorModel:Model<Author> , 
    @InjectModel(Book.name) private bookModel:Model<Book>){}

    async create( authorData:CreateAuthorDTO) {
        try {
            const author = new this.authorModel(authorData);
            await author.save();
            return {
                message:"Author created successfully"
            }
          } catch (err) {
            throw err
          }
    }

    async update(id:string , authorData:UpdateAuthorDTO) {
        try {
            const author = await this.authorModel.findByIdAndUpdate(id , authorData , {new:true , runValidators:true})
            if(!author){
                throw new NotFoundException("Author not found")
            }
            return {
                message:"Author updated successfully" ,
                data:author
            }
        }
        catch(error){
            throw error
        }

    }

    async findMultiple(authorSearch:AuthorSearchDTO){
        try {
        const countryQuery = authorSearch.country ? {country:authorSearch.country}: {}
        const nameQuery =authorSearch.search ? {$or:[{firstName:{$regex:`${authorSearch.search}` , $options:`i`}}, 
        {lastName:{$regex:`${authorSearch.search}` , $options:`i`}}]}:{}
        const query = {...countryQuery , ...nameQuery}
        let message = "Authors fetched successfully" 
        const authors = await this.authorModel.aggregate([
            {
                $match: query
            } ,
            {
               $lookup : {
                     from: "books" ,
                     localField:"books" ,
                     foreignField: `_id` ,
                     as: "books_data"



               }
            }
        ])
        if(authors.length === 0) {
            message = "No Authors found"
        }
        return {
            message:message ,
            data:authors
        }
        } catch(error){
            throw error
        }
    }

    async findOne(id:string) {
        try {
        const author = await this.authorModel.findById(id).populate(`books`)
        if(!author){
            throw new NotFoundException(`Author not Found`)
        }
        return {
            message: "Author fetched successfully" ,
            data:author
        }
        } catch(error){
             throw error
        }
    }

    async remove(id:string) {
        const session = await this.authorModel.db.startSession()
        session.startTransaction()
        try{
        const author = await this.authorModel.findById(id).session(session)
        if(!author) {
            throw new NotFoundException("Author not found")
        }
        await this.bookModel.updateMany({ _id: {$in:author.books} }  ,
            {$pull:{authors:author._id}} , {session}
        )
        await author.deleteOne().session(session)
        await session.commitTransaction();
        return {
            message:"Author deleted successfully"
        }

        
     }
    
    catch(error) {
        await session.abortTransaction();
        throw error
    }
    finally {
      await session.endSession()
    }

}
}
