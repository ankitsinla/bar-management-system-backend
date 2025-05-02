import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionDaoService } from '@modules/dao/transaction-dao/transaction-dao.service';
import { TableDaoService } from '@modules/dao/table-dao/table-dao.service';
import {
  DailyTransactionsDto,
  TransactionTypeEnum,
} from './dto/daily-transaction.dto';
import {
  MonthlyProductTransactionDto,
  MonthlyTransactionsDto,
} from './dto/monthly-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionDaoService: TransactionDaoService,
    private readonly tableDaoService: TableDaoService,
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
    request: any,
  ) {
    const user = request.user;
    createTransactionDto.billerId = user.sub;
    createTransactionDto.amount =
      this.calculateTransactionAmount(createTransactionDto);
    const table = await this.tableDaoService.getTableDataByName(
      createTransactionDto.tableName,
    );
    if (!table)
      throw new HttpException('Invalid table name.', HttpStatus.BAD_REQUEST);
    createTransactionDto.tableId = table._id?.toString();
    return await this.transactionDaoService.createTransaction(
      createTransactionDto,
    );
  }

  calculateTransactionAmount(createTransactionDto: CreateTransactionDto) {
    const products = createTransactionDto.products;
    let totalAmount = 0;
    if (products.length) {
      totalAmount = products.reduce((totalAmount, product) => {
        totalAmount += product.quantity * product.rate;
        return totalAmount;
      }, 0);
    }
    if (createTransactionDto.discount) {
      if (totalAmount < createTransactionDto.discount)
        throw new HttpException(
          'Invalid discount - Discount cannot be greater than bill amount.',
          HttpStatus.BAD_REQUEST,
        );
      totalAmount -= createTransactionDto.discount;
    }
    return totalAmount;
  }

  async getDailyTransactions(dailyTransactionsDto: DailyTransactionsDto) {
    const { date, type } = dailyTransactionsDto;
    if (type === TransactionTypeEnum.TRANSACTION_WISE) {
      return this.transactionDaoService.getTransactionsByDate(date);
    }
    return this.transactionDaoService.getProductTransactionByDate(date);
  }

  async getMonthlyTransaction(monthlyTransactionsDto: MonthlyTransactionsDto) {
    const { month, year } = monthlyTransactionsDto;
    const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
    return this.transactionDaoService.getTransactionsByMonth(yearMonth);
  }

  async getMonthlyTransactionForProductDto(
    monthlyTransactionsDto: MonthlyProductTransactionDto,
  ) {
    const { month, year, id } = monthlyTransactionsDto;
    const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
    return await this.transactionDaoService.getProductTransactionByMonth(
      id,
      yearMonth,
    );
  }
}
