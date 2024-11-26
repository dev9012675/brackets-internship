import { IsOptional, IsString } from 'class-validator';

export class SmsDTO {
  @IsOptional()
  @IsString()
  body?: string;
}
