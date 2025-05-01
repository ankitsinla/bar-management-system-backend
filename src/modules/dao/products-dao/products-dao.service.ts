import { ProductCategory, ProductCategoryStatusEnum } from "@modules/products/entities/product-category.entity";
import { Product, ProductStatusEnum } from "@modules/products/entities/product.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DataSource } from "typeorm";

@Injectable()
export class ProductsDaoService {
	constructor(private readonly dataSource: DataSource,
		@InjectModel(ProductCategory.name) private productCategoryModel: Model<ProductCategory>,
		@InjectModel(Product.name) private productModel: Model<Product>
	) { }

	async getAllProducts(name?: string) {
		const searchParams = {};
		if (name) searchParams["name"] = { $regex: name, $options: 'i' }
		return await this.productModel.find(searchParams).populate('category');
	}

	async addProduct(product: Product) {
		return await this.dataSource.getRepository(Product).save(product);
	}

	async getProductInfoById(id: number) {
		return await this.dataSource.getRepository(Product).findOne({
			where: {
				id
			}
		});
	}

	async createProduct(name: string, category: ProductCategory, currentPrice: number) {
		const newProduct = new this.productModel({
			name,
			category: category._id,
			currentPrice,
			status: ProductStatusEnum.IN_STOCK
		})
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
			status: ProductCategoryStatusEnum.ACTIVE
		});

		return await newProductCategory.save();
	}

	async getProductCategory(name: string) {
		const searchParams = {};
		if (name) searchParams["name"] = { $regex: name, $options: 'i' };
		return await this.productCategoryModel.find(searchParams);
	}
}
