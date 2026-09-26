import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginEmailDto {
  @ApiProperty({ description: "User's email address or username" })
  @IsString()
  @IsNotEmpty()
  Email!: string;

  @ApiProperty({ description: "User's password" })
  @IsString()
  @IsNotEmpty()
  Password!: string;
}
