import { Controller, Post, RawBodyRequest, Req, Res , Headers , UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { StripeService } from './stripe.service';
import { CreateCustomerDTO } from './dtos/CreateCustomerDTO';
import { CreateSubscriptionDTO } from './dtos/CreateSubscriptionDTO';


@Controller('api/stripe')
export class StripeController {
    constructor(private readonly stripeService:StripeService){}

    @Post('/create-customer')
    @UsePipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }))
    async createCustomer(@Body() customer:CreateCustomerDTO){
            const createdCustomer = await this.stripeService.createCustomer(customer)
            return {customer:createdCustomer}
           
    }

    @Post('/create-subscription')
    @UsePipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }))
    async createSubscription(@Body() subscription:CreateSubscriptionDTO ){
        return await this.stripeService.createSubscripton(subscription)
       
        

    }

    

}
