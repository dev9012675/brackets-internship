import {
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsString,
    Min,
    IsIn,
    IsISBN,
    IsMongoId,
    IsDate
  } from 'class-validator';
  import { Transform } from 'class-transformer';
  import { genres } from '../book.schema';
  export type Genres = (typeof genres)[number];
  
  export class CreateBookDTO {
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsNotEmpty()
    @IsMongoId({each:true})
    authors: string[];

    @IsNotEmpty()
    @IsString()
    description: string;

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
    @Transform(({ value }) => value ? new Date(value) : value)  
    @IsDate()
    publishedDate: Date;
  
    @IsNotEmpty()
    @IsString()
    @IsISBN()
    isbn: string;
  }