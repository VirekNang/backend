import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty()
  @IsNumber()
  UserID!: number;

  @ApiProperty()
  @IsString()
  PermissionName!: string;
}
