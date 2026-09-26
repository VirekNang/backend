import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class OauthLoginDto {
   @ApiProperty({ required: false })
    @IsOptional()
  @IsString()
  IDToken?: string;   // Google sends this

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  Token?: string;  

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  SessionState?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  Name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  Phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  AccessToken?: string;
}