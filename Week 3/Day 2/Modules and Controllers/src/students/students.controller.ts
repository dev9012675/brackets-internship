import { Controller , Get, Param, Post } from '@nestjs/common';

@Controller('students')
export class StudentsController {
    @Get()
    async findAll():Promise<string> {
        return `This action returns all students`
    }

    @Get(`:id`)
    async findOne(@Param(`id`) id:string):Promise<string> {
        return `This action returns a student having id:${id}`

    }

    @Post()
    async create():Promise<string> {
        return "This action creates a student"
    }
}
