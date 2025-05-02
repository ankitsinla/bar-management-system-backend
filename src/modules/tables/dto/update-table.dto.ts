import { PartialType } from '@nestjs/mapped-types';
import { CreateTableDto } from './create-table.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { TableStatusEnum } from '../entities/table.entity';

export class UpdateTableDto extends PartialType(CreateTableDto) {
  @ApiProperty({ enum: TableStatusEnum, description: 'Table status' })
  @IsEnum(TableStatusEnum)
  @IsOptional()
  status: TableStatusEnum;
}
