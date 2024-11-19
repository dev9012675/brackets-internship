import { IsDateString, IsNotEmpty, IsString } from "class-validator";

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

    @IsNotEmpty()
    @IsString()
    country:string
}