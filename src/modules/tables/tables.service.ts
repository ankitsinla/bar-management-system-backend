import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { TableDaoService } from '@modules/dao/table-dao/table-dao.service';
import { CommonUtilityService } from '@utils/common/common-utility/common-utility.service';
import { UserRoleEnum } from '@modules/users/entities/user.entity';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TablesService {
  constructor(
    private readonly tableDaoService: TableDaoService,
    private readonly commonUtilityService: CommonUtilityService,
  ) {}

  async create(createTableDto: CreateTableDto, request) {
    this.commonUtilityService.validateUserRole(request.user?.role, [
      UserRoleEnum.ADMIN,
    ]);
    const { tableName } = createTableDto;
    const tableExist = await this.tableDaoService.getTableDataByName(tableName);
    if (tableExist)
      throw new HttpException('Table name already exist', HttpStatus.CONFLICT);
    return await this.tableDaoService.createTable(tableName);
  }

  async findAll() {
    return await this.tableDaoService.getAllTableData();
  }

  async updateTable(id: string, updateTableDto: UpdateTableDto) {
    const updated = await this.tableDaoService.updateTable(id, updateTableDto);
    if (!updated) {
      throw new HttpException('Invalid table id.', HttpStatus.NOT_FOUND);
    }
    return updated;
  }
}
