import { BadRequestException, ConflictException, Injectable , RawBodyRequest } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import { Model } from 'mongoose';
import { CreateCustomerDTO } from './dtos/CreateCustomerDTO';
import { CreateSubscriptionDTO } from './dtos/CreateSubscriptionDTO';
import { error } from 'console';
import { TwilioService } from 'src/twilio/twilio.service';

@Injectable()
export class StripeService {
    private stripe:Stripe

    constructor(private readonly configService:ConfigService , private readonly twilioService:TwilioService ,
       @InjectModel(Customer.name) private customerModel:Model<Customer>) {
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
        await this.customerModel.create({email:customer.email , customerId:createdCustomer.id , phone:customer.phone ,
          name:customer.name
        })
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
 
              return {
                subscriptionId: createdSubscription.id,
                clientSecret:clientSecret,
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

    async getPlanName(priceId:string){
         const plans = {
          price_1QRAzHCQEKXjEMeamDO6ntZ0: `Basic` ,
          price_1QRAzICQEKXjEMeaG1mpFmap: `Premium`
         }
         return plans[priceId]
    }

    async handleWebHook(req:RawBodyRequest<Request>){
      let event
      try {
          event = this.stripe.webhooks.constructEvent(
          req.rawBody,
          req.header('Stripe-Signature'),
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.log(err);
        console.log(`Webhook signature verification failed.`);
      
        throw error
      }
      const dataObject = event.data.object;
      switch (event.type) {
      case 'invoice.payment_succeeded':
        if(dataObject['billing_reason'] == 'subscription_create') {
          const subscription_id = dataObject['subscription']
          const payment_intent_id = dataObject['payment_intent']

  
          const payment_intent = await this.stripe.paymentIntents.retrieve(payment_intent_id);
         
          try {
            if(typeof payment_intent.payment_method === `string`) {
              const subscription = await this.stripe.subscriptions.update(
                subscription_id,
                {
                  default_payment_method: payment_intent.payment_method,
                },
              );
              const priceId = dataObject.lines.data.length > 0 ? dataObject.lines.data[0].price.id : null;

              if (!priceId) {

                throw new Error(`Price id not found`)
              }
              //console.log(`Subscribed to ${await this.getPlanName(priceId)} plan`)
              
              
              const customer = await this.customerModel.findOneAndUpdate({customerId:subscription.customer}, 
                {subscriptionId:subscription.id , subscriptionStatus:subscription.status ,
                  startDate:new Date(subscription.start_date*1000 )  , priceId:priceId
                }, {new:true})
                
              
              console.log("Default payment method set for subscription:" + payment_intent.payment_method);
          
              await this.twilioService.sendMessage({to:customer.phone , 
                body:`Hello ${customer.name}.You have successfully subscribed to the ${await this.getPlanName(priceId)} plan`})
              return {
                message:"Subscription created successfully"
              }
            }
            else {
              throw new Error(`Failed to set payment method`)
            }
          
          } catch (err) {
            throw err
            
          }
        };

        break;
      case 'invoice.payment_failed':
        console.log(`Subscription failed`)
        break;

      default:
        console.log(`Some other event occured`)
      }
      return {message: "Event received"}
          

    }
    


    



}
