import { Body, Controller, Post } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { SmsDTO } from './dtos/SmsDTO';
import { CallDTO } from './dtos/CallDTO';

@Controller('api')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post(`messages/send`)
  async sendMessage(@Body() sms: SmsDTO) {
    return await this.twilioService.sendMessage(sms);
  }

  @Post(`calls`)
  async sendCall(@Body() call: CallDTO) {
    return await this.twilioService.sendCall(call);
  }
}
