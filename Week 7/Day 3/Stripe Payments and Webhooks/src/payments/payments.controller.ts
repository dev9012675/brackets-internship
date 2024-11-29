import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentData } from './dtos/PaymentDataDTO';
import { Request, Response } from 'express';

@Controller('api/payments')
export class PaymentsController {
    constructor(private readonly paymentsService:PaymentsService){}

    @Post()
    async create(@Body() data:PaymentData){
        return this.paymentsService.getPaymentIntent(data)
    }

    @Post(`/webhook`)
    async alert(@Req() req:Request , @Res() res:Response) {
        const event = req.body
        switch(event.type){
            case `payment_intent.succeeded`:
                console.log(`Payment  succeeded`)
                return res.sendStatus(200)
               
            case  `payment_intent.payment_failed`:
                console.log(`Payment failed`)
                return res.sendStatus(400)
               
            default:
                return res.sendStatus(200)
                

        }

    }
}
