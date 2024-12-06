import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerDTO {

    @IsNotEmpty()
    @IsString()
    name:string



    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    phone:string
}