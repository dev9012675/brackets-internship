import {
    IsArray,
    IsDateString,
    IsNumber,
    IsString,
    Min,
    IsIn,
    IsISBN,
    IsOptional,
  } from 'class-validator';
  import { genres } from 'src/books/book.schema';
  export type Genres = (typeof genres)[number];
  
  export class UpdateBookDTO {
    @IsOptional()
    @IsString()
    title?: string;
  
    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsString()
    publisher?:string
  
    @IsOptional()
    @IsNumber()
    @Min(1)
    pages?: number;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @IsIn(genres, { each: true })
    genres?: Genres[];
  
    @IsOptional()
    @IsDateString()
    publishedDate?: Date;
  
    @IsOptional()
    @IsString()
    @IsISBN()
    isbn?: string;
  }