import { Table, TableStatusEnum } from '@modules/tables/entities/table.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TableDaoService {
    constructor(
        @InjectModel(Table.name) private tableModel: Model<Table>
    ) { }

    async createTable(tableName: string) {
        const newTable = new this.tableModel({
            tableName,
            status: TableStatusEnum.ACTIVE
        })
        return await newTable.save();
    }

    async getTableDataByName(tableName?: string) {
        return await this.tableModel.findOne({
            tableName,
            status: TableStatusEnum.ACTIVE
        })
    }

    async getAllTableData(tableName?: string) {
        const searchParams = { status: TableStatusEnum.ACTIVE };
        if (tableName) searchParams["tableName"] = { $regex: tableName, $options: 'i' }
        return await this.tableModel.find(searchParams);
    }
}
