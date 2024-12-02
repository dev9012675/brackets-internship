import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SmsDTO {
  @IsNotEmpty()
  @IsString()
  to: string;

  @IsOptional()
  @IsString()
  body?: string;
}
