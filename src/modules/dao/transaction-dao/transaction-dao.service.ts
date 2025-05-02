import { CreateTransactionDto } from '@modules/transactions/dto/create-transaction.dto';
import { Transaction } from '@modules/transactions/entites/transactions.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class TransactionDaoService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

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
      tableId,
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
      tableId,
    });

    return await newTransaction.save();
  }

  async getTransactionsByDate(date: string) {
    return await this.transactionModel
      .find({
        transactionDate: date,
      })
      .populate({ path: 'billerId', select: 'name role' })
      .populate({ path: 'tableId', select: 'tableName' })
      .populate({
        path: 'products.productId',
        select: 'name category',
        populate: {
          path: 'category',
          select: 'name',
        },
      })
      .exec();
  }

  async getTransactionsByMonth(yearMonth: string) {
    return await this.transactionModel.aggregate([
      {
        $match: {
          transactionDate: { $regex: `^${yearMonth}` },
        },
      },
      {
        $group: {
          _id: {
            date: '$transactionDate',
            paymentMode: '$paymentMode',
          },
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.date',
          payments: {
            $push: {
              paymentMode: '$_id.paymentMode',
              totalAmount: '$totalAmount',
              count: '$count',
            },
          },
        },
      },
      {
        $sort: { _id: 1 }, // sort by date
      },
    ]);
  }

  async getProductTransactionByMonth(productId: string, yearMonth: string) {
    return await this.transactionModel.aggregate([
      {
        $match: {
          transactionDate: { $regex: `^${yearMonth}` },
          'products.productId': new mongoose.Types.ObjectId(productId),
        },
      },
      { $unwind: '$products' },
      {
        $match: {
          'products.productId': new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: {
            date: '$transactionDate',
            productId: '$products.productId',
          },
          totalQuantity: { $sum: '$products.quantity' },
          totalAmount: {
            $sum: { $multiply: ['$products.quantity', '$products.rate'] },
          },
          productRate: { $first: '$products.rate' }, // Use the rate from transaction
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id.productId',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      { $unwind: '$productDetails' },
      {
        $lookup: {
          from: 'product_category',
          localField: 'productDetails.category',
          foreignField: '_id',
          as: 'categoryDetails',
        },
      },
      { $unwind: '$categoryDetails' },
      {
        $project: {
          _id: 0,
          date: '$_id.date',
          productName: '$productDetails.name',
          categoryName: '$categoryDetails.name',
          rate: '$productRate', // Use the rate from transaction
          totalQuantity: 1,
          totalAmount: 1,
        },
      },
      { $sort: { date: 1 } },
    ]);
  }

  async getProductTransactionByDate(date: string) {
    return await this.transactionModel.aggregate([
      {
        $match: {
          transactionDate: date,
        },
      },
      { $unwind: '$products' },
      {
        $group: {
          _id: '$products.productId',
          totalQuantity: { $sum: '$products.quantity' },
          totalAmount: {
            $sum: { $multiply: ['$products.quantity', '$products.rate'] },
          },
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      { $unwind: '$productDetails' },
      {
        $lookup: {
          from: 'product_category',
          localField: 'productDetails.category',
          foreignField: '_id',
          as: 'categoryDetails',
        },
      },
      { $unwind: '$categoryDetails' },
      {
        $project: {
          _id: 0,
          productId: '$_id',
          productName: '$productDetails.name',
          categoryName: '$categoryDetails.name',
          totalQuantity: 1,
          totalAmount: 1,
          currentRate: '$productDetails.currentPrice',
        },
      },
    ]);
  }
}
