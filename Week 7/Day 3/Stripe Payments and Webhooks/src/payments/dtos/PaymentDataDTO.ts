import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class PaymentData {

    @IsNotEmpty()
    @IsNumber()
    amount:number

    @IsNotEmpty()
    @IsString()
    currency:string

}