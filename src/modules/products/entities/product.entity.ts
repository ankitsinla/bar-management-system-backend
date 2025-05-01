// import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import { ProductCategory } from "./product-category.entity";

// export enum ProductStatusEnum {
// 	IN_STOCK = "IN_STOCK",
// 	INACTIVE = "INACTIVE",
// 	OUT_OF_STOCK = "OUT_OF_STOCK"
// }

// @Entity()
// export class Product {
// 	@PrimaryGeneratedColumn()
// 	id: number;

// 	@Column({ length: 100 })
// 	name: string;

// 	@ManyToOne(() => ProductCategory, productCategory => productCategory.products)
// 	category: ProductCategory;

// 	@Column({ type: "float", precision: 10, scale: 2 })
// 	stock?: number;

// 	@Column({ type: "float", precision: 10, scale: 2 })
// 	currentPrice?: number;

// 	@Column({ type: "enum", enum: ProductStatusEnum })
// 	status: ProductStatusEnum;

// 	@CreateDateColumn({ type: "datetime" })
// 	createdAt: Date;

// 	@UpdateDateColumn({ type: "datetime" })
// 	updatedAt: Date;

// 	constructor(name: string, category: ProductCategory, stock:number = 0, currentPrice: number = 0, status: ProductStatusEnum = ProductStatusEnum.IN_STOCK) {
// 		this.name = name;
// 		this.status = status;
// 		this.category = category;
// 		this.currentPrice = currentPrice;
// 		this.stock = stock;
// 	}
// }


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { ProductCategory } from './product-category.entity';

export enum ProductStatusEnum {
	IN_STOCK = 'IN_STOCK',
	INACTIVE = 'INACTIVE',
	OUT_OF_STOCK = 'OUT_OF_STOCK'
}

@Schema({ timestamps: true, versionKey: false })
export class Product extends Document {
	@Prop({ required: true, maxlength: 100 })
	name: string;

	@Prop({ type: MongooseSchema.Types.ObjectId, ref: 'ProductCategory', required: true })
	category: Types.ObjectId;

	@Prop({ type: Number, default: 0 })
	currentPrice: number;

	@Prop({ type: String, enum: ProductStatusEnum, required: true })
	status: ProductStatusEnum;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
