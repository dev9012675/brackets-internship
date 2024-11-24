import { IsOptional, IsString } from "class-validator";


export class AuthorSearchDTO {

    @IsOptional()
    @IsString()
    search?:string

    @IsOptional()
    @IsString()
    country?:string

}