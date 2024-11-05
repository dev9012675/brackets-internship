import {  IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateGradeInfoDTO {

    @IsNotEmpty()
    @IsNumber({} , {each : true})
    readonly scores:number[]

    @IsOptional()
    @IsString()
    readonly grade:string
}

