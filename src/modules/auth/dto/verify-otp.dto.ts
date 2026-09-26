import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty()
  @IsString()
  Phone!: string;

  @ApiProperty()
  @IsString()
  OTP!: string;
}
