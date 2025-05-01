import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AuthGuardsService } from '@modules/guards/guards.service';

@Controller('transactions')
@ApiTags('Transaction')
@UseGuards(AuthGuardsService)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto, @Request() request: any) {
    return await this.transactionsService.createTransaction(createTransactionDto, request);
  }
}
