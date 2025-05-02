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
  async createProduct(createProductDto: CreateProductDto, request) {
    this.commonUtilityService.validateUserRole(request.user?.role, [
      UserRoleEnum.ADMIN,
    ]);
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

  async findOne(id: string) {
    const product = await this.productDaoService.getProductWithHistory(id);
    if (!product)
      throw new HttpException('Data not found.', HttpStatus.NOT_FOUND);
    return product;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto, request) {
    const user = request.user;
    this.commonUtilityService.validateUserRole(user?.role, [
      UserRoleEnum.ADMIN,
    ]);
    const existingProduct = await this.productDaoService.getProductInfoById(id);
    if (!existingProduct) {
      throw new HttpException('Product not found.', HttpStatus.BAD_REQUEST);
    }
    const updatedProduct = await this.productDaoService.updateProduct(
      id,
      updateProductDto,
    );
    const productHistoryData = this.updatedFields(
      id,
      user?.sub,
      updateProductDto,
      existingProduct,
    );
    const productHistoryDataRes =
      await this.productDaoService.addProductHistoryData(productHistoryData);
    return updatedProduct;
  }

  updatedFields(
    productId: string,
    updatedBy: string,
    updateProductDto: UpdateProductDto,
    existing,
  ) {
    return Object.keys(updateProductDto).reduce(
      (history, key) => {
        if (existing[key] != updateProductDto[key]) {
          history.push({
            updateKey: key,
            previousValue: existing[key]?.toString(),
            newValue: updateProductDto[key]?.toString(),
            updatedBy,
            productId,
          });
        }
        return history;
      },
      [] as {
        updateKey: string;
        previousValue: string;
        newValue: string;
        updatedBy: string;
        productId: string;
      }[],
    );
  }
}
