import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { ProductStatusEnum } from '../entities/product.entity';
import { IsEmpty, isEmpty, IsEnum, IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ enum: ProductStatusEnum, description: 'Payment Mode' })
  @IsEnum(ProductStatusEnum)
  @IsOptional()
  status: ProductStatusEnum;
}
