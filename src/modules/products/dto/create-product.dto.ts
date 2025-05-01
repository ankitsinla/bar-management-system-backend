import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	category: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	currentPrice: string;
}

export class CreateProductCategoryDto{
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	imageUrl: string;
}

export class GetByNameDto{
	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	name: string;
}
