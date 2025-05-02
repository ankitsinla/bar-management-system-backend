import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AuthGuardsService } from '@modules/guards/guards.service';
import { DailyTransactionsDto } from './dto/daily-transaction.dto';
import {
  MonthlyProductTransactionDto,
  MonthlyTransactionsDto,
} from './dto/monthly-transaction.dto';

@Controller('transactions')
@ApiTags('Transaction')
@UseGuards(AuthGuardsService)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('bill')
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Request() request: any,
  ) {
    return await this.transactionsService.createTransaction(
      createTransactionDto,
      request,
    );
  }

  @Get('daily')
  async getTransactionByDate(
    @Query() dailyTransactionsDto: DailyTransactionsDto,
  ) {
    return await this.transactionsService.getDailyTransactions(
      dailyTransactionsDto,
    );
  }

  @Get('monthly')
  async getTransactionByMonth(
    @Query() monthlyTransactionsDto: MonthlyTransactionsDto,
  ) {
    return await this.transactionsService.getMonthlyTransaction(
      monthlyTransactionsDto,
    );
  }

  @Get('product')
  async getTransactionForProductByMonth(
    @Query() monthlyTransactionsDto: MonthlyProductTransactionDto,
  ) {
    return await this.transactionsService.getMonthlyTransactionForProductDto(
      monthlyTransactionsDto,
    );
  }
}
