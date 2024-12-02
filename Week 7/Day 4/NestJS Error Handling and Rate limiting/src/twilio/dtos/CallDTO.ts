import { IsNotEmpty, IsString } from 'class-validator';

export class CallDTO {
  @IsNotEmpty()
  @IsString()
  to: string;
}
