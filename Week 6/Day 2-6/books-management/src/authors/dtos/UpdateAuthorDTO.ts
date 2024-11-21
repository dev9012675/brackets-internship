import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateAuthorDTO {

    @IsOptional()
    @IsString()
    firstName?:string

    @IsOptional()
    @IsString()
    lastName?:string

    @IsOptional()
    @IsDateString()
    dateOfBirth?: Date

    @IsOptional()
    @IsDateString()
    dateOfDeath?: Date

    @IsOptional()
    @IsString()
    biography?:string

    @IsOptional()
    @IsString()
    country?:string

    
}