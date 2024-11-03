import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEmergencyContactDTO {
   
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly relation: string;

    @IsNotEmpty()
    @IsString()
    readonly phone: string;

}

