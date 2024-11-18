import { Body, Controller, Post } from '@nestjs/common';
import { Book } from './book.schema';
import { BooksService } from './books.service';

@Controller('api/books')
export class BooksController {
    constructor(private booksService:BooksService) {}

    @Post()
    async create(@Body() book:Book) {
        return await this.booksService.create(book)
    }
}
