import { Body, Controller, Delete, Get, NotFoundException, Param, Post , Put, UsePipes , ValidationPipe } from '@nestjs/common';
import { CreateAuthorDTO } from 'src/authors/dtos/CreateAuthorDTO';
import { AuthorsService } from './authors.service';
import { UpdateAuthorDTO } from './dtos/UpdateAuthorDTO';

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
          const updatedAuthor = await this.authorService.update(id , author)
          if(!updatedAuthor) {
            throw new NotFoundException("Author not found")
          }
          return updatedAuthor
  
        }

        @Get()
        async findAll(){
             return this.authorService.findAll()
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
