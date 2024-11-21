import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
export type AuthorDocument = HydratedDocument<Author>;

@Schema({timestamps:true})
export class Author {
  @Prop({ type: String, required: true , minlength: 1 })
  firstName: string;

  @Prop({ type: String , required: true , minlength: 1 })
  lastName: string;

  @Prop({ type: Date , required: true , validate: (v: Date) => v instanceof Date })
  dateOfBirth: Date

  @Prop({ type: String , required:true , minlength: 1 })
  country: string;

  @Prop({ type: String , required:true , minlength: 1 })
  biography:string

  @Prop({ type: Date , required: false , validate: (v: Date) => v instanceof Date })
  dateOfDeath: Date

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' , default:[]}])
  books:  mongoose.Schema.Types.ObjectId[];;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);