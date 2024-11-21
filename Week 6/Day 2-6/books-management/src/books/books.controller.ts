import { Body, Controller, Param, Post , Put, UsePipes , ValidationPipe , Get , Delete, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/CreateBookDTO';
import { UpdateBookDTO } from './dtos/UpdateBookDTO';
import { SearchDTO } from './dtos/SearchDTO';

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
        @UsePipes(
          new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
          }),
        )
        async findAll(@Query() search:SearchDTO){
             return this.booksService.findAll(search)
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
