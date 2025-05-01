import { Module, ValidationPipe } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./modules/users/users.module";
import { DaoModule } from "@modules/dao/dao.module";
import { UtilsModule } from "./utils/utils.module";
import { APP_PIPE } from "@nestjs/core";
import { LoggerModule } from "./logger/logger.module";
import { ProductsModule } from "@modules/products/products.module";
import { ConfigModule } from "./config/config.module";
import { SeederModule } from "./seeder/seeder.module";
import { TransactionsModule } from "@modules/transactions/transactions.module";
import { TablesModule } from "@modules/tables/tables.module";

@Module({
	imports: [DatabaseModule, UsersModule, DaoModule, UtilsModule, LoggerModule, ProductsModule, ConfigModule, SeederModule, TransactionsModule, TablesModule],
	controllers: [AppController],
	providers: [AppService, { provide: APP_PIPE, useClass: ValidationPipe }]
})
export class AppModule {

	constructor() { }
}
