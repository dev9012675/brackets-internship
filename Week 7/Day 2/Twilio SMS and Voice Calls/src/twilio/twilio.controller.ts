import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { SmsDTO } from './dtos/SmsDTO';
import { Request, Response } from 'express';

@Controller('api')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post(`messages/send`)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async sendMessage(@Body() sms: SmsDTO) {
    return await this.twilioService.sendMessage(sms);
  }

  @Post(`calls`)
  async sendCall() {
    return await this.twilioService.sendCall();
  }

 
}
