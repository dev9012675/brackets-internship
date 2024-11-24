import { IsDate,  IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateAuthorDTO {

    @IsOptional()
    @IsString()
    firstName?:string

    @IsOptional()
    @IsString()
    lastName?:string

    @IsOptional()
    @Transform(({ value }) => value ? new Date(value) : value)  
    @IsDate()
    dateOfBirth?: Date

    @IsOptional()
    @Transform(({ value }) => value ? new Date(value) : value)  
    @IsDate()
    dateOfDeath?: Date

    @IsOptional()
    @IsString()
    biography?:string

    @IsOptional()
    @IsString()
    country?:string

    
}