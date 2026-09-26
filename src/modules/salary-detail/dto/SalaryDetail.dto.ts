import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class SalaryDetailDto {
  
  @ApiProperty({ example: '' })
  @IsNumber()
  @IsNotEmpty()

  EmployeeID!: number;
  @ApiProperty({ example: '' })
  @IsNumber()
  @IsNotEmpty()

  Bonus!: number;
  @ApiProperty({ example: '' })
  @IsNumber()
  @IsNotEmpty()
  
  Month!: number;
  @ApiProperty({ example: 2026 })
  @IsNumber()
  @IsNotEmpty()
  Year!: number;
 
  @ApiPropertyOptional({ example: true, default: true })
  @IsNumber()
  @IsOptional()
  SalaryOfMonth?: number;
  @ApiPropertyOptional({ example: true, default: true })
  @IsNumber()
  @IsOptional()
  TotalSalary?: number;
   @ApiPropertyOptional({ example: true, default: true })
  @IsString()
  @IsOptional()
  Note?: string;
  
 
}
