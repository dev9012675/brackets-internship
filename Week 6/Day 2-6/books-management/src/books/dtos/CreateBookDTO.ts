import {
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsString,
    Min,
    IsIn,
    IsISBN,
  } from 'class-validator';
  import { genres } from 'src/books/book.schema';
  export type Genres = (typeof genres)[number];
  
  export class CreateBookDTO {
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsString()
    publisher:string
  
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    pages: number;
  
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @IsIn(genres, { each: true })
    genres: Genres[];
  
    @IsNotEmpty()
    @IsDateString()
    publishedDate: Date;
  
    @IsNotEmpty()
    @IsString()
    @IsISBN()
    isbn: string;
  }