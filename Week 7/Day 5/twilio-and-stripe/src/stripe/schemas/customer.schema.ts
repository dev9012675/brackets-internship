
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
  @Prop({unique:true , required:true})
  email: string;

  @Prop({required:true})
  customerId: string;

  @Prop({required:true})
  phone: string;

  @Prop()
  subscriptionId:string

 
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
