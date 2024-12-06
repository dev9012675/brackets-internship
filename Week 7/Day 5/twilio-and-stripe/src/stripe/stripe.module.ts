import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { TwilioModule } from 'src/twilio/twilio.module';

@Module({
  imports:  [TwilioModule , MongooseModule.forFeature([{ name: Customer.name , schema: CustomerSchema}]) ] ,
  controllers: [StripeController],
  providers: [StripeService]
})
export class StripeModule {}
