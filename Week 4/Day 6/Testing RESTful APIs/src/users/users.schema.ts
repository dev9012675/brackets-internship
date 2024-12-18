import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { roles } from '../types/role.type';
import { Book } from '../books/books.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret.password; // Exclude password field
      return ret;
    },
  },
  toObject: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret.password; // Exclude password field
      return ret;
    },
  },
})
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  password: string;

 

  @Prop({ type: String, required: true, enum: roles, default: 'user' })
  role: string;

  @Prop()
  hashedRefreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
