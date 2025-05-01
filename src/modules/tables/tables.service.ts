import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { TableDaoService } from '@modules/dao/table-dao/table-dao.service';
import { CommonUtilityService } from '@utils/common/common-utility/common-utility.service';
import { UserRoleEnum } from '@modules/users/entities/user.entity';

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
}
