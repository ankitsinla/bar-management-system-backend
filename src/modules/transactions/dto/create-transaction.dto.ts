// create-transaction.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PaymentModeEnum } from '../entites/transactions.entity';
import { ObjectId } from 'mongoose';

class ProductItemDto {
    @ApiProperty({ description: 'Product ID', type: String })
    @IsMongoId()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({ description: 'Quantity of product', example: 2 })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({ description: 'Rate of product', example: 100 })
    @IsNumber()
    @IsNotEmpty()
    rate: number;
}

export class CreateTransactionDto {
    @ApiProperty({ type: [ProductItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductItemDto)
    products: ProductItemDto[];

    @ApiProperty({ description: 'Discount applied', required: false, example: 10 })
    @IsOptional()
    @IsNumber()
    discount?: number;

    @ApiProperty({ description: 'Remarks about the discount', required: false })
    @IsOptional()
    @IsString()
    discountRemarks?: string;

    @ApiProperty({ description: 'Total transaction amount', example: 250 })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ description: 'Date of transaction', example: '2024-04-30T12:00:00Z' })
    @IsString()
    @IsNotEmpty()
    transactionDate: string;

    @ApiProperty({ enum: PaymentModeEnum, description: 'Payment Mode' })
    @IsEnum(PaymentModeEnum)
    @IsNotEmpty()
    paymentMode: PaymentModeEnum;

    @ApiProperty({ description: 'Payment remarks', required: false })
    @IsOptional()
    @IsString()
    paymentRemarks?: string;

    @ApiProperty({ description: 'Table name', example: 'Table-1' })
    @IsString()
    @IsNotEmpty()
    tableName: string;

    billerId: string;
    tableId: string;
}
