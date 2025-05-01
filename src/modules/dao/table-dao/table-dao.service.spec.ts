import { Test, TestingModule } from '@nestjs/testing';
import { TableDaoService } from './table-dao.service';

describe('TableDaoService', () => {
  let service: TableDaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableDaoService],
    }).compile();

    service = module.get<TableDaoService>(TableDaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
