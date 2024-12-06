import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as twilio from 'twilio';
import TwilioClient from 'twilio/lib/rest/Twilio';
import { SmsDTO } from './dtos/SmsDTO';
@Injectable()
export class TwilioService {
  private client: TwilioClient;
  constructor(private configService: ConfigService) {
    const twilioAccountSid =
      this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');

    if (!twilioAccountSid || !twilioAuthToken) {
      throw new Error('Twilio account SID/auth token not found');
    }

    this.client = twilio(twilioAccountSid, twilioAuthToken);
  }

  async sendMessage(sms: SmsDTO) {
    try {
      const sender = this.configService.get<string>('TWILIO_PHONE_NO');
      console.log(sms)


      if (!sender) {
        throw new Error('Sender Phone Number not found');
      }

      const messageBody = sms.body
        ? sms.body
        : 'This is the test message sent from the Application';

      await this.client.messages.create({
        body: messageBody,

        from: sender,

        to: sms.to,
      });

      return {
        message: `SMS sent successfully`,
      };
    } catch (error) {
      throw error;
    }
  }

 
}
