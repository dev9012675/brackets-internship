import { Injectable } from '@nestjs/common';
import { PaymentData } from './dtos/PaymentDataDTO';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class PaymentsService {
    
    private stripe:Stripe

    constructor(private readonly configService:ConfigService) {
        const apiKey  = this.configService.get<string>('STRIPE_KEY');
  
      if (!apiKey ) {
        throw new Error('Stripe API key not found');
      }
      this.stripe = new Stripe(apiKey)
    }

    async getPaymentIntent(data:PaymentData){
        const intent = await this.stripe.paymentIntents.create(data)
        return {client_secret:intent.client_secret}


    }
    

}
