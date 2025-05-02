import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { AuthGuardsService } from '@modules/guards/guards.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('tables')
@ApiTags('Table')
@UseGuards(AuthGuardsService)
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  async create(
    @Body() createTableDto: CreateTableDto,
    @Request() request: any,
  ) {
    return await this.tablesService.create(createTableDto, request);
  }

  @Get()
  async findAll() {
    return await this.tablesService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTableDto: UpdateTableDto,
  ) {
    return await this.tablesService.updateTable(id, updateTableDto);
  }
}
