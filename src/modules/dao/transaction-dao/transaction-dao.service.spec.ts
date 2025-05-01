import { Test, TestingModule } from '@nestjs/testing';
import { TransactionDaoService } from './transaction-dao.service';

describe('TransactionDaoService', () => {
  let service: TransactionDaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionDaoService],
    }).compile();

    service = module.get<TransactionDaoService>(TransactionDaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
