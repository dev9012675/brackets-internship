import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PersonalInfo , Address , EmergencyContact , GradeInfo  } from 'src/students/student.interfaces';
export type StudentDocument = HydratedDocument<Student>

  @Schema()
export class Student {
  @Prop({  type: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number},
    gender: {type: String}
},required:true})
  info:PersonalInfo

  @Prop({  type: {
    country: { type: String, required: true },
   state: { type: String},
    city: { type: String},
    street: {type: String}
}})
  location:Address

  @Prop({  type: {
    scores: { type: [Number], required: true },
    grade: { type: String},
  
  }})
  grade: GradeInfo;

    @Prop({  type: {
      name: { type: String, required: true },
      relation: { type: String , required: true},
      phone: { type: String , required: true},
  }})
  emergencyInfo:EmergencyContact

}


export const StudentSchema = SchemaFactory.createForClass(Student);

