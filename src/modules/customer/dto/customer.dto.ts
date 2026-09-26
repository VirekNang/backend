import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CustomerDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MaxLength(50)
  CustomerName!: string;

  @ApiProperty({ example: '0123456789' })
  @IsString()
  @MaxLength(50)
  Phone!: string;

 

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  MembershipID?: number;

  @ApiProperty({ example: 'Male' })
  @IsString()
  @MaxLength(50)
  Gender!: string;

  @ApiProperty({ example: '123 Main Street, Bangkok' })
  @IsString()
  @MaxLength(50)
  Address!: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  rewardPoints?: number;

  @ApiProperty({ example: 'New customer' })
  @IsString()
  @MaxLength(250)
  Note!: string;
}




