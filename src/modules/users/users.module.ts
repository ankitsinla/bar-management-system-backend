import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UtilsModule } from "@utils/utils.module";
import { DaoModule } from "@modules/dao/dao.module";

@Module({
	imports:[UtilsModule, DaoModule],
	controllers: [UsersController],
	providers: [UsersService]
})
export class UsersModule {}
