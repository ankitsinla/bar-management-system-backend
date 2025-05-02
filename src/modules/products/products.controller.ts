import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProductCategoryDto,
  CreateProductDto,
  GetByNameDto,
} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuardsService } from '@modules/guards/guards.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
@UseGuards(AuthGuardsService)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //Category
  @Post('category')
  async createCategory(
    @Body() createProductDto: CreateProductCategoryDto,
    @Request() request: any,
  ) {
    return await this.productsService.createProductCategory(
      createProductDto,
      request,
    );
  }

  @Get('category')
  async getProductCategory(@Query() query: GetByNameDto) {
    return this.productsService.getAllProductCategories(query);
  }

  //Products
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Request() request: any) {
    return this.productsService.createProduct(createProductDto, request);
  }

  @Get()
  findAll(@Query() query: GetByNameDto) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Request() request: any
  ) {
    return this.productsService.updateProduct(id, updateProductDto, request);
  }
}
