// import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import { Product } from "./product.entity";

// export enum ProductCategoryStatusEnum {
//     ACTIVE = "ACTIVE",
//     INACTIVE = "INACTIVE"
// }

// @Entity({ name: "product_category" })
// export class ProductCategory {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({ length: 100 })
//     name: string;

//     @Column({ type: "text", nullable: true })
//     imageUrl?: string;

//     @Column({ type: "enum", enum: ProductCategoryStatusEnum })
//     status: ProductCategoryStatusEnum;

//     @CreateDateColumn({ type: "datetime" })
//     createdAt: Date;

//     @UpdateDateColumn({ type: "datetime" })
//     updatedAt: Date;

//     @OneToMany(() => Product, (product) => product.category)
//     products: Product[]

//     constructor(name: string, imageUrl?: string, status: ProductCategoryStatusEnum = ProductCategoryStatusEnum.ACTIVE) {
//         this.name = name;
//         this.status = status;
//         this.imageUrl = imageUrl;
//     }
// }

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export enum ProductCategoryStatusEnum {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE'
}

@Schema({ timestamps: true, versionKey: false, collection: "product_category"})
export class ProductCategory extends Document {
	@Prop({ required: true, maxlength: 100, unique: true })
	name: string;

	@Prop({ type: String })
	imageUrl?: string;

	@Prop({ enum: ProductCategoryStatusEnum, required: true })
	status: ProductCategoryStatusEnum;

}

export const ProductCategorySchema = SchemaFactory.createForClass(ProductCategory);
