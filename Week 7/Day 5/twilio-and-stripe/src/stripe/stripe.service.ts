import { BadRequestException, ConflictException, Injectable , RawBodyRequest } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import { Model } from 'mongoose';
import { CreateCustomerDTO } from './dtos/CreateCustomerDTO';
import { CreateSubscriptionDTO } from './dtos/CreateSubscriptionDTO';

@Injectable()
export class StripeService {
    private stripe:Stripe

    constructor(private readonly configService:ConfigService , @InjectModel(Customer.name) private customerModel:Model<Customer>) {
        const apiKey  = this.configService.get<string>('STRIPE_KEY');
  
      if (!apiKey ) {
        throw new Error('Stripe API key not found');
      }
      this.stripe = new Stripe(apiKey)
    }

    async createCustomer(customer:CreateCustomerDTO){
      try{
        const check = await this.stripe.customers.list({
          email: customer.email,
        });
      if(check.data.length === 0) {
        const createdCustomer = await this.stripe.customers.create({
          ...customer
        });
        await this.customerModel.create({email:customer.email , customerId:createdCustomer.id , phone:customer.phone})
        return createdCustomer
      }
      else {
        throw new ConflictException(`Customer with the provided email already exists.`)
      }


    }
    catch(error){
      throw error
    }
      


    }

    async createSubscripton(subscription:CreateSubscriptionDTO){
        try{
          const check = await this.stripe.customers.retrieve(subscription.customerId);
          if(!check ){
            throw new ConflictException(`Customer does not exist.`)
          }
          const subscriptionCheck = await this.stripe.subscriptions.list({
            customer:subscription.customerId
          });
          if(subscriptionCheck.data.length === 0) {
            const createdSubscription =  await this.stripe.subscriptions.create({
              customer: subscription.customerId,
              items: [{
                price: subscription.priceId,
              }],
              payment_behavior: 'default_incomplete',
              expand: ['latest_invoice.payment_intent'],
            })
            const latestInvoice = createdSubscription.latest_invoice
            if(latestInvoice && typeof latestInvoice !== `string` && latestInvoice.payment_intent 
              && typeof latestInvoice.payment_intent !== `string`
            ){
              const clientSecret = latestInvoice.payment_intent.client_secret;
              await this.customerModel.updateOne({customerId:subscription.customerId}, 
                {subscriptionId:createdSubscription.id})
              return {
                subscriptionId: createdSubscription.id,
                clientSecret,
              }
            }
            else {
              throw new Error('Failed to retrieve the payment intent from the latest invoice.');
            }
            
          }
          else {
            throw new ConflictException(`Subscription already exists for the provided user.`)
          }
       
        }catch(error){
          throw error
        }
       
    }

    



}
