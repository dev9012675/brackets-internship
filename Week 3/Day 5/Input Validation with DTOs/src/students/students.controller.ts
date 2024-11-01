import { Body, Controller , Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from 'src/schemas/student.schema';
import { CreateStudentDTO, UpdateStudentDTO } from './dto/StudentDTO';

@Controller('api/students')
export class StudentsController {
    constructor(private studentService:StudentsService) {}
    @Get()
    async findAll():Promise<Student[]> {
        return this.studentService.findAll()
    }

    @Get(`:id`)
    async findOne(@Param(`id`) id:string):Promise<Student> {
        return this.studentService.findOne(id)

    }

    @Post()
    async create(@Body() student:CreateStudentDTO):Promise<Student> {
        return this.studentService.create(student)
    }

    @Put(`:id`)
    async update(@Param(`id` ) id:string , @Body() student:UpdateStudentDTO) {
        return this.studentService.update(id , student)
    }
    
    @Delete(`:id`)
    async delete(@Param(`id`) id:string) {
        return this.studentService.remove(id)
    }
}
