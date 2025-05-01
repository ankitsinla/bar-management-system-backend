import { Test, TestingModule } from '@nestjs/testing';
import VariableConstantsService  from './variable-constants.service';

describe('VariableConstantsService', () => {
  let service: VariableConstantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariableConstantsService],
    }).compile();

    service = module.get<VariableConstantsService>(VariableConstantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
