import { Body, Controller, Param, Post , Put, UsePipes , ValidationPipe , Get , Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/CreateBookDTO';
import { UpdateBookDTO } from './dtos/UpdateBookDTO';

@Controller('api/books')
export class BooksController {
    constructor(private booksService:BooksService) {}

    @Post()
    @UsePipes(
        new ValidationPipe({
          transform: true,
          whitelist: true,
          forbidNonWhitelisted: true,
        }),
      )
    async create(@Body() book:CreateBookDTO) {
        return await this.booksService.create(book)
    }

    @Put(`:id`)
    @UsePipes(
        new ValidationPipe({
          transform: true,
          whitelist: true,
          forbidNonWhitelisted: true,
        }),
      )
    async update( @Param(`id`) id:string  , @Body() book:UpdateBookDTO) {
        return await this.booksService.update(id , book)
    }

        @Get()
        async findAll(){
             return this.booksService.findAll()
        }

        @Get(`:id`)
        async findOne(@Param(`id`) id:string){
            return this.booksService.findOne(id)
        }

        @Delete(`:id`)
        async remove(@Param(`id`) id:string) {
          return this.booksService.remove(id)
        }
}
