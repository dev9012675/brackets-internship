import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateAuthorDTO {

    @IsNotEmpty()
    @IsString()
    firstName:string

    @IsNotEmpty()
    @IsString()
    lastName:string

    @IsNotEmpty()
    @Transform(({ value }) => value ? new Date(value) : value)  
    @IsDate()
    dateOfBirth: Date

    @IsOptional()
    @Transform(({ value }) => value ? new Date(value) : value)  
    @IsDate()
    dateOfDeath?: Date

    @IsNotEmpty()
    @IsString()
    biography:string

    @IsNotEmpty()
    @IsString()
    country:string
}