import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAuthorDTO {

    @IsNotEmpty()
    @IsString()
    firstName:string

    @IsNotEmpty()
    @IsString()
    lastName:string

    @IsNotEmpty()
    @IsDateString()
    dateOfBirth: Date

    @IsOptional()
    @IsDateString()
    dateOfDeath?: Date

    @IsNotEmpty()
    @IsString()
    biography:string

    @IsNotEmpty()
    @IsString()
    country:string
}