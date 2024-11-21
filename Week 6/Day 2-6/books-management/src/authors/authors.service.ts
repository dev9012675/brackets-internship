import {  Injectable, NotFoundException } from '@nestjs/common';
import { Author } from 'src/authors/author.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthorDTO } from 'src/authors/dtos/CreateAuthorDTO';
import { UpdateAuthorDTO } from './dtos/UpdateAuthorDTO';
import { Book } from 'src/books/book.schema';

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
            throw new Error(`Failed to create author: ${err.message}`);
          }
    }

    async update(id:string , authorData:UpdateAuthorDTO) {
        try {
            return await this.authorModel.findByIdAndUpdate(id , authorData , {new:true , runValidators:true})
        }
        catch(e){
            throw new Error(`Failed to update author: ${e.message}`);
        }

    }

    async findAll(){
        return await this.authorModel.find().populate(`books`)
    }

    async findOne(id:string) {
       return await this.authorModel.findById(id).populate(`books`)
    }

    async remove(id:string) {
        const author = await this.authorModel.findById(id)
        if(!author) {
            throw new NotFoundException("Author not found")
        }
        await this.bookModel.updateMany({ _id: {$in:author.books} }  ,
            {$pull:{authors:author._id}} 
        )
        await author.deleteOne()
        return {
            message:"Author deleted successfully"
        }

        
    }
}
