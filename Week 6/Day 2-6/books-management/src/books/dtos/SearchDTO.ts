import { IsIn, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { genres } from "../book.schema";
import { Type } from "class-transformer";


export class SearchDTO {
    @IsOptional()
    @IsString()
    search?:string

    @IsOptional()
    @IsString()
    @IsIn(genres)
    genre?:string

    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(1)
    page?:number

    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(1)
    limit?:number


}