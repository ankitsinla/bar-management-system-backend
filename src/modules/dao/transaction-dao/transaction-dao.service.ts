import { CreateTransactionDto } from '@modules/transactions/dto/create-transaction.dto';
import { Transaction } from '@modules/transactions/entites/transactions.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TransactionDaoService {
    constructor(
        @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    ) { }

    async createTransaction(createTransactionDto: CreateTransactionDto) {
        const {
            products,
            discount,
            discountRemarks,
            amount,
            transactionDate,
            paymentMode,
            paymentRemarks,
            billerId,
            tableId
        } = createTransactionDto;

        const newTransaction = new this.transactionModel({
            products,
            discount,
            discountRemarks,
            amount,
            transactionDate,
            paymentMode,
            paymentRemarks,
            billerId,
            tableId
        });

        return await newTransaction.save();
    }
}
