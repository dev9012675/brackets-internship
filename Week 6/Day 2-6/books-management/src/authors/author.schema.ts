import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Book } from '../books/book.schema';
import mongoose from 'mongoose';
export type AuthorDocument = HydratedDocument<Author>;

@Schema({timestamps:true})
export class Author {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String , required: true })
  lastName: string;

  @Prop({ type: Date , required: true })
  dateOfBirth: Date

  @Prop({ type: String , required:true})
  country: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' , default:null}])
  books: Book[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);