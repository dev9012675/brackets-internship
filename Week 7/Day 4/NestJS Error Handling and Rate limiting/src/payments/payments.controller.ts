import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentData } from './dtos/PaymentDataDTO';

@Controller('api/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async create(@Body() data: PaymentData) {
    return this.paymentsService.getPaymentIntent(data);
  }
}
