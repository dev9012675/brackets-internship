import { IsNotEmpty, IsObject, IsOptional, ValidateNested  } from "class-validator";
import { Type  } from "class-transformer";
import { CreatePersonalInfoDTO } from "./PersonalInfoDTO";
import { CreateAddressDTO } from "./AddressDTO";
import { CreateGradeInfoDTO } from "./GradeInfoDTO";
import { CreateEmergencyContactDTO } from "./EmergencyContactDTO";


export class CreateStudentDTO {

    @IsNotEmpty()
    @IsObject()
    @Type(() => CreatePersonalInfoDTO)
    @ValidateNested()
    info:CreatePersonalInfoDTO

    @IsOptional()
    @IsObject()
    @Type(() => CreateAddressDTO)
    @ValidateNested()
    location:CreateAddressDTO

    @IsOptional()
    @IsObject()
    @Type(() => CreateGradeInfoDTO)
    @ValidateNested()
    grade:CreateGradeInfoDTO

    @IsOptional()
    @IsObject()
    @Type(() => CreateEmergencyContactDTO)
    @ValidateNested()
    emergencyInfo:CreateEmergencyContactDTO


}

export class UpdateStudentDTO {

    @IsOptional()
    @IsObject()
    @Type(() => CreatePersonalInfoDTO)
    @ValidateNested()
    info:CreatePersonalInfoDTO

    @IsOptional()
    @IsObject()
    @Type(() => CreateAddressDTO)
    @ValidateNested()
    location:CreateAddressDTO

    @IsOptional()
    @IsObject()
    @Type(() => CreateGradeInfoDTO)
    @ValidateNested()
    grade:CreateGradeInfoDTO

    @IsOptional()
    @IsObject()
    @Type(() => CreateEmergencyContactDTO)
    @ValidateNested()
    emergencyInfo:CreateEmergencyContactDTO
}