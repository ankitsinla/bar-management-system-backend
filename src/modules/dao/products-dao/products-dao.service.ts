import { UpdateProductDto } from '@modules/products/dto/update-product.dto';
import {
  ProductCategory,
  ProductCategoryStatusEnum,
} from '@modules/products/entities/product-category.entity';
import { ProductHistory } from '@modules/products/entities/product-history.entity';
import {
  Product,
  ProductStatusEnum,
} from '@modules/products/entities/product.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProductsDaoService {
  constructor(
    @InjectModel(ProductCategory.name)
    private productCategoryModel: Model<ProductCategory>,

    @InjectModel(Product.name) private productModel: Model<Product>,

    @InjectModel(ProductHistory.name)
    private productHistoryModel: Model<ProductHistory>,
  ) {}

  async getAllProducts(name?: string) {
    const searchParams = {};
    if (name) searchParams['name'] = { $regex: name, $options: 'i' };
    return await this.productModel.find(searchParams).populate('category');
  }

  async createProduct(
    name: string,
    category: ProductCategory,
    currentPrice: number,
  ) {
    const newProduct = new this.productModel({
      name,
      category: category._id,
      currentPrice,
      status: ProductStatusEnum.IN_STOCK,
    });
    const savedProuct = await newProduct.save();
    return await savedProuct.populate('category');
  }

  async getProductByName(name: string) {
    return await this.productModel.findOne({ name }).populate('category');
  }

  //Product Category
  async createProductCategory(name: string, imageUrl: string) {
    const newProductCategory = new this.productCategoryModel({
      name,
      imageUrl,
      status: ProductCategoryStatusEnum.ACTIVE,
    });

    return await newProductCategory.save();
  }

  async getProductCategory(name: string) {
    const searchParams = {};
    if (name) searchParams['name'] = { $regex: name, $options: 'i' };
    return await this.productCategoryModel.find(searchParams);
  }

  async getProductInfoById(id: string) {
    return await this.productModel.findById(id);
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
      runValidators: true,
    });
  }

  async addProductHistoryData(productHistoryData) {
    await this.productHistoryModel.insertMany(productHistoryData);
  }

  async getProductWithHistory(productId: string) {
    const objectId = new Types.ObjectId(productId);

    const result = await this.productModel.aggregate([
      { $match: { _id: objectId } },
      {
        $lookup: {
          from: 'product_history',
          let: { productId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$productId', '$$productId'] },
              },
            },
            { $sort: { createdAt: -1 } }, // Sort by createdAt descending
            {
              $project: {
                updateKey: 1,
                previousValue: 1,
                newValue: 1,
                createdAt: 1,
              },
            },
          ],
          as: 'history',
        },
      },
      {
        $lookup: {
          from: 'product_category',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryData',
        },
      },
      { $unwind: '$categoryData' },
      {
        $project: {
          _id: 1,
          name: 1,
          currentPrice: 1,
          status: 1,
          history: 1,
          category: {
            name: '$categoryData.name',
          },
        },
      },
    ]);

    return result[0];
  }
}
