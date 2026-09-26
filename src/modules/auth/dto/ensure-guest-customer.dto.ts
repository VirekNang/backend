import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EnsureGuestCustomerDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  CustomerName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  Phone?: string;
}
