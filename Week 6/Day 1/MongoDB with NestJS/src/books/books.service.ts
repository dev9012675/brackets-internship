import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './book.schema';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
    constructor(@InjectModel(Book.name) private bookModel:Model<Book>){}

    async create(book:Book) {
        return await this.bookModel.create(book)
    }
}
