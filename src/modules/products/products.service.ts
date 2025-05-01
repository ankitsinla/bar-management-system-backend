import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateProductCategoryDto,
  CreateProductDto,
  GetByNameDto,
} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsDaoService } from '@modules/dao/products-dao/products-dao.service';
import { Product, ProductStatusEnum } from './entities/product.entity';
import { CommonUtilityService } from '@utils/common/common-utility/common-utility.service';
import { UserRoleEnum } from '@modules/users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productDaoService: ProductsDaoService,
    private readonly commonUtilityService: CommonUtilityService,
  ) {}

  //Product Category
  async createProductCategory(
    createProductCategoryDto: CreateProductCategoryDto,
    request,
  ) {
    this.commonUtilityService.validateUserRole(request.user?.role, [
      UserRoleEnum.ADMIN,
    ]);
    const { name, imageUrl } = createProductCategoryDto;
    const productCategoryExists =
      await this.productDaoService.getProductCategory(name);
    if (productCategoryExists.length) {
      throw new HttpException(
        'Product category already exists.',
        HttpStatus.CONFLICT,
      );
    }
    return await this.productDaoService.createProductCategory(name, imageUrl);
  }

  async getAllProductCategories(queryParams: GetByNameDto) {
    const { name } = queryParams;
    return await this.productDaoService.getProductCategory(name);
  }

  //Products
  async createProduct(createProductDto: CreateProductDto) {
    const { name, category, currentPrice } = createProductDto;
    const productCategory =
      await this.productDaoService.getProductCategory(category);
    if (!productCategory.length) {
      throw new HttpException(
        'Invalid product category.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const productExist = await this.productDaoService.getProductByName(name);
    if (productExist) {
      throw new HttpException('Product exist.', HttpStatus.CONFLICT);
    }
    return await this.productDaoService.createProduct(
      name,
      productCategory[0],
      +currentPrice,
    );
  }

  async findAll(query: GetByNameDto) {
    const { name } = query;
    const products = await this.productDaoService.getAllProducts(name);
    return products;
  }

  async findOne(id: number) {
    return await this.productDaoService.getProductInfoById(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productDaoService.getProductInfoById(id);
    if (!product) {
      return 'product not found';
    }

    const { name } = updateProductDto;
    product.name = name;
    await this.productDaoService.addProduct(product);
    return `success`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
