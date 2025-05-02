import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { TransactionTypeEnum } from './daily-transaction.dto';

class MonthYearDto {
  @ApiProperty({
    description: 'Date - MM',
    required: false,
    example: '04',
  })
  @IsNotEmpty()
  @IsString()
  month: string;

  @ApiProperty({
    description: 'Date - YYYY',
    required: false,
    example: '2025',
  })
  @IsNotEmpty()
  @IsString()
  year: string;
}

export class MonthlyTransactionsDto extends MonthYearDto {}

export class MonthlyProductTransactionDto extends MonthYearDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
