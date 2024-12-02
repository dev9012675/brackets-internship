import { IsNotEmpty, IsString } from "class-validator";

export class CreateSubscriptionDTO {

    @IsNotEmpty()
    @IsString()
    customerId:string

    @IsNotEmpty()
    @IsString()
    priceId:string
}