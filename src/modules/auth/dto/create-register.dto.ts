import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  Username!: string;

  @ApiProperty()
  @IsEmail()
  Email!: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  Password!: string;

  @ApiProperty()
  @IsString()
  Phone!: string;
}