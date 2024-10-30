import { Injectable } from '@nestjs/common';
import { CreateStudentDTO } from './dto/create-student-dto';

@Injectable()
export class StudentsService {
    private readonly students:CreateStudentDTO[] = []

    create(student:CreateStudentDTO){
        this.students.push(student)
        return student
    }

    findOne(id:number) {
        for(let student of this.students) {
            if(student["id"] === id) {
                return student
            }
        }

        return `There is no student with id:${id} in the system`
    }

    findAll(){
        return this.students
    }
}
