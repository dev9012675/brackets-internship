import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './books.schema';
import { User, UserSchema } from '../users/users.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema } , {name: User.name , schema:UserSchema}]),
    UsersModule
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
