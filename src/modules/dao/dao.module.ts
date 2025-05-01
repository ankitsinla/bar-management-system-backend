import { Module } from "@nestjs/common";
import { DaoService } from "./dao.service";
import { ProductsDaoService } from "./products-dao/products-dao.service";
import { UserDaoService } from './user-dao/user-dao.service';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "@modules/users/entities/user.entity";
import { ProductCategory, ProductCategorySchema } from "@modules/products/entities/product-category.entity";
import { Product, ProductSchema } from "@modules/products/entities/product.entity";
import { TransactionDaoService } from './transaction-dao/transaction-dao.service';
import { Transaction, TransactionSchema } from "@modules/transactions/entites/transactions.entity";
import { TableDaoService } from './table-dao/table-dao.service';
import { Table, TableSchema } from "@modules/tables/entities/table.entity";

@Module({
	providers: [DaoService, ProductsDaoService, UserDaoService, TransactionDaoService, TableDaoService],
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: ProductCategory.name, schema: ProductCategorySchema },
			{ name: Product.name, schema: ProductSchema },
			{ name: Transaction.name, schema: TransactionSchema },
			{ name: Table.name, schema: TableSchema }
		]),
	],
	exports: [DaoService, ProductsDaoService, UserDaoService, TransactionDaoService, TableDaoService]
})
export class DaoModule { }
