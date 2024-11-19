import {  Injectable } from '@nestjs/common';
import { Author } from 'src/authors/author.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthorDTO } from 'src/authors/dtos/CreateAuthorDTO';
import { UpdateAuthorDTO } from './dtos/UpdateAuthorDTO';

@Injectable()
export class AuthorsService {
    constructor(@InjectModel(Author.name) private authorModel:Model<Author>){}

    async create( authorData:CreateAuthorDTO) {
        try {
            const author = new this.authorModel(authorData);
            await author.save();
            return "Author created successfully"
          } catch (err) {
            throw new Error(`Failed to create book: ${err.message}`);
          }
    }

    async update(id:string , authorData:UpdateAuthorDTO) {
        try {
            return await this.authorModel.findByIdAndUpdate(id , authorData , {new:true})
        }
        catch(e){
            throw new Error(`Failed to create book: ${e.message}`);
        }

    }

    async findAll(){
        return await this.authorModel.find().populate(`books`)
    }

    async findOne(id:string) {
       return await this.authorModel.findById(id).populate(`books`)
    }
}
