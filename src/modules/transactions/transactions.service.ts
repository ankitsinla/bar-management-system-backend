import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionDaoService } from '@modules/dao/transaction-dao/transaction-dao.service';
import { TableDaoService } from '@modules/dao/table-dao/table-dao.service';

@Injectable()
export class TransactionsService {
    constructor(
        private readonly transactionDaoService: TransactionDaoService,
        private readonly tableDaoService: TableDaoService
    ) { }

    async createTransaction(createTransactionDto: CreateTransactionDto, request: any) {
        const user = request.user;
        createTransactionDto.billerId = user.sub;
        createTransactionDto.amount = this.calculateTransactionAmount(createTransactionDto);
        const table = await this.tableDaoService.getTableDataByName(createTransactionDto.tableName);
        if (!table) throw new HttpException("Invalid table name.", HttpStatus.BAD_REQUEST);
        createTransactionDto.tableId = table._id?.toString();
        return await this.transactionDaoService.createTransaction(createTransactionDto);
    }

    calculateTransactionAmount(createTransactionDto: CreateTransactionDto) {
        const products = createTransactionDto.products;
        let totalAmount = 0;
        if (products.length) {
            totalAmount = products.reduce((totalAmount, product) => {
                totalAmount += (product.quantity * product.rate);
                return totalAmount;
            }, 0)
        }
        if (createTransactionDto.discount) {
            totalAmount -= createTransactionDto.discount;
        }
        return totalAmount;
    }
}
