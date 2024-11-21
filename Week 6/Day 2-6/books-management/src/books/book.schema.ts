import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
export const genres = ['Fantasy', 'Thriller', 'Science Fiction', 'Romance' , `Western` 
    , `Literary Fiction` , `Horror` , `Adventure` , "Drama" , "Dystopian" , "Classic"] as const;

export type BookDocument = HydratedDocument<Book>;

@Schema({timestamps:true})
export class Book {
  @Prop({ type: String, required: true , minlength:1 })
  title: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' , default: []}])
  authors: mongoose.Schema.Types.ObjectId[]

  @Prop({ type: String, required: true , minlength:1 })
  description: string;

  @Prop({ type: String , required: true , minlength:1  })
  publisher: string

  @Prop({ type: Number, required: true, min: 1 })
  pages: number;

  @Prop({ type: [String], required: true, enum: genres })
  genres:string[]

  @Prop({ type: Date, required: true })
  publishedDate:Date

  @Prop({ type: String, unique: true, required: true })
  isbn:string
}

export const BookSchema = SchemaFactory.createForClass(Book);

BookSchema.index({
  title: "text" ,
  description: "text"
})