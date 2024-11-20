import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from 'src/authors/author.schema';
import { Book, BookSchema } from 'src/books/book.schema';

@Module({
  imports:  [MongooseModule.forFeature([{ name: Author.name , schema: AuthorSchema } , 
    { name: Book.name , schema: BookSchema }
  ])] ,
  controllers: [AuthorsController],
  providers: [AuthorsService]
})
export class AuthorsModule {}
