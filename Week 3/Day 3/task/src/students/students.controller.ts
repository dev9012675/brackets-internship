import { Body, Controller , Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDTO } from './dto/create-student-dto';

@Controller('students')
export class StudentsController {
    constructor(private studentService:StudentsService) {}
    @Get()
    async findAll() {
        return this.studentService.findAll()
    }

    @Get(`:id`)
    async findOne(@Param(`id` , ParseIntPipe) id:number) {
        return this.studentService.findOne(id)

    }

    @Post()
    async create(@Body() student:CreateStudentDTO) {
        return this.studentService.create(student)
    }
}
