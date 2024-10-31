import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type StudentDocument = HydratedDocument<Student>

  @Schema()
export class Student {
  @Prop({required:true})
  name: string;

  @Prop({required:true})
  email: string;

  @Prop()
  gender:string

  @Prop()
  age: number;

  @Prop()
  country: string;

  @Prop()
  state: string;

  @Prop()
  city: string;

  @Prop()
  street: string;

  @Prop([Number])
  scores:number[]

  @Prop()
  grade:string


}

export const StudentSchema = SchemaFactory.createForClass(Student);

