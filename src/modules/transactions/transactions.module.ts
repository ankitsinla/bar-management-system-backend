import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { DaoModule } from '@modules/dao/dao.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [DaoModule]
})
export class TransactionsModule { }
