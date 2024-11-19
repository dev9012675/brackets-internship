import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book , BookSchema } from 'src/books/book.schema';
import { Author, AuthorSchema } from 'src/authors/author.schema';

@Module({
  imports:  [MongooseModule.forFeature([{ name: Book.name , schema: BookSchema } , 
    { name: Author.name , schema: AuthorSchema } 
  ])] ,
  providers: [BooksService],
  controllers: [BooksController]
})
export class BooksModule {}
