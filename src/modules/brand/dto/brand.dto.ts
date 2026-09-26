import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
 BrandName!: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  Description!: string;
   
  @ApiPropertyOptional({ example: true, default: true })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;
  @ApiProperty({
    type: 'string',
    format: 'binary',

  })
  Image: any;
 
}
