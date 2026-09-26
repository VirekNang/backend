import { PartialType } from '@nestjs/swagger';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateMembershipDto {
  @ApiProperty({ example: 'Gold' })
  @IsString()
  @MaxLength(100)
  MembershipName!: string;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  DiscountRate?: number;

  @ApiPropertyOptional({ example: 500 })
  @IsOptional()
  @IsInt()
  @Min(0)
  MinPoints?: number;

  @ApiPropertyOptional({ example: 'Members receive a 10% discount.' })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  Description?: string;
}

export class UpdateMembershipDto extends PartialType(CreateMembershipDto) {}
