import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsBoolean, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Must match an existing EmployeeID' })
  @IsNumber()
  UserID!: number;

  @ApiProperty()
  @IsString()
  Username!: string;

  @ApiProperty()
  @IsString()
  Password!: string;

  @ApiProperty()
  @IsEmail()
  Email!: string;

  @ApiProperty()
  @IsString()
  Phone!: string;

  @ApiProperty()
  @IsString()
  Image!: string;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  IsAdmin?: boolean;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty()
  @IsDateString()
  IsDuDate!: string;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  IsDelete?: boolean;
}
