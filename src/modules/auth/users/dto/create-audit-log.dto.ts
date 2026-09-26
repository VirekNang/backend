import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAuditLogDto {
  @ApiProperty()
  @IsNumber()
  UserID!: number;

  @ApiProperty()
  @IsString()
  TableName!: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  RecordID?: number;

  @ApiProperty()
  @IsString()
  ActionType!: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  OldValue?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  NewValue?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Note?: string;
}
