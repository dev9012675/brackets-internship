import { Body, Controller , Delete, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, UseFilters } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from 'src/schemas/student.schema';
import { CreateStudentDTO, UpdateStudentDTO } from './dto/StudentDTO';
import { ValidationExceptionFilter } from 'src/ValidationExceptionFilter';
import mongoose from 'mongoose';

@Controller('api/students')

export class StudentsController {
    constructor(private studentService:StudentsService) {}
    @Get()
    async findAll():Promise<Student[]> {
        return this.studentService.findAll()
    }

    @Get(`:id`)
    async findOne(@Param(`id`) id:string):Promise<Student> {
       
        if(!(mongoose.Types.ObjectId.isValid(id) && (new mongoose.Types.ObjectId(id)).toString() === id)) {
            throw new HttpException("Invalid ID" , HttpStatus.BAD_REQUEST)

        }
        const response = await this.studentService.findOne(id)
        if(!response){
            throw new NotFoundException()
        }
        else {
            return response
        }
        
        
        

    }

    @Post()
    @UseFilters(ValidationExceptionFilter)
    async create(@Body() student:CreateStudentDTO):Promise<Student> {
        return this.studentService.create(student)
    }

    @Put(`:id`)
    @UseFilters(ValidationExceptionFilter)
    async update(@Param(`id` ) id:string , @Body() student:UpdateStudentDTO) {
        if(!(mongoose.Types.ObjectId.isValid(id) && (new mongoose.Types.ObjectId(id)).toString() === id)) {
            throw new HttpException("Invalid ID" , HttpStatus.BAD_REQUEST)

        }
        const response = await this.studentService.update(id , student)
        if(!response){
            throw new NotFoundException()
        }
        else {
            return response
        }
    }
    
    @Delete(`:id`)
    async delete(@Param(`id`) id:string) {
        if(!(mongoose.Types.ObjectId.isValid(id) && (new mongoose.Types.ObjectId(id)).toString() === id)) {
            throw new HttpException("Invalid ID" , HttpStatus.BAD_REQUEST)

        }
        const response = await this.studentService.remove(id)
        if(!response){
            throw new NotFoundException()
        }
        else {
            return response
        }
    }
}
