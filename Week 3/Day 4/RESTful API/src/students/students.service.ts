import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from 'src/schemas/student.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentsService {
    constructor(@InjectModel(Student.name) private studentModel: Model<Student>) {}

    async create(student:Student):Promise<Student>{
        const createdStudent = new this.studentModel(student);
        return createdStudent.save();
    }

    async findOne(id:string):Promise <Student> {
       return this.studentModel.findById(id)
    }

    async findAll():Promise<Student[]>{
        return this.studentModel.find().exec()
    }

    async update(id:string , student:Partial<Student>) {
        return this.studentModel.findByIdAndUpdate(id , student , {new:true})

    }

    async remove(id:string) {
        return this.studentModel.findByIdAndDelete(id)
    }
}
