import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsBoolean, IsDateString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Username?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Password?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  Email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Phone?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Image?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  IsAdmin?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  IsDuDate?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  IsDelete?: boolean;
}
