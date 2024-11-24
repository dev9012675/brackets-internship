import { Body, Controller, Delete, Get, NotFoundException, Param, Post , Put, Query, UsePipes , ValidationPipe } from '@nestjs/common';
import { CreateAuthorDTO } from 'src/authors/dtos/CreateAuthorDTO';
import { AuthorsService } from './authors.service';
import { UpdateAuthorDTO } from './dtos/UpdateAuthorDTO';
import { AuthorSearchDTO } from './dtos/AuthorSearchDTO';

@Controller('api/authors')
export class AuthorsController {
    constructor(private readonly authorService:AuthorsService) {}

    @Post()
    @UsePipes(
        new ValidationPipe({
          transform: true,
          whitelist: true,
          forbidNonWhitelisted: true,
        }),
      )
      async create(@Body() author:CreateAuthorDTO) {
        return this.authorService.create(author)

      }

      @Put(`:id`)
      @UsePipes(
          new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
          }),
        )
        async update( @Param(`id`) id:string, @Body() author:UpdateAuthorDTO) {
          return  await this.authorService.update(id , author)
        
  
        }

        @Get()
        @UsePipes(
          new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
          }),
        )
        async findAll(@Query() authorSearch:AuthorSearchDTO){
             return this.authorService.findMultiple(authorSearch)
        }

        @Get(`:id`)
        async findOne(@Param(`id`) id:string){
            return this.authorService.findOne(id)
        }

        @Delete(`:id`)
        async remove(@Param(`id`) id:string) {
          return this.authorService.remove(id)
        }
}
