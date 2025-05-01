import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { DaoModule } from '@modules/dao/dao.module';
import { UtilsModule } from '@utils/utils.module';

@Module({
  controllers: [TablesController],
  providers: [TablesService],
  imports: [DaoModule, UtilsModule],
})
export class TablesModule {}
