import {
    IsArray,
    IsDate,
    IsNumber,
    IsString,
    Min,
    IsIn,
    IsISBN,
    IsOptional,
    IsMongoId,
  } from 'class-validator';
  import { Transform } from 'class-transformer';
  import { genres } from '../book.schema';
  export type Genres = (typeof genres)[number];
  
  export class UpdateBookDTO {
    @IsOptional()
    @IsString()
    title?: string;
  
    @IsOptional()
    @IsMongoId({each:true})
    authors?: string[];

    @IsOptional()
    @IsString()
    description?: string;

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
    @Transform(({ value }) => value ? new Date(value) : value)  
    @IsDate()
    publishedDate?: Date;
  
    @IsOptional()
    @IsString()
    @IsISBN()
    isbn?: string;
  }