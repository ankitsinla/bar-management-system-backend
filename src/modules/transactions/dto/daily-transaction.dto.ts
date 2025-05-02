import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum TransactionTypeEnum {
  PRODUCT_WISE = 'PRODUCT_WISE',
  TRANSACTION_WISE = 'TRANSACTION_WISE',
}

export class DailyTransactionsDto {
  @ApiProperty({
    description: 'Date - YYYY-MM-DD',
    required: false,
    example: '2025-04-21',
  })
  @IsNotEmpty()
  @IsString()
  date: string;

  @ApiProperty({ enum: TransactionTypeEnum, description: 'Transaction Type' })
  @IsEnum(TransactionTypeEnum)
  type: TransactionTypeEnum;
}
