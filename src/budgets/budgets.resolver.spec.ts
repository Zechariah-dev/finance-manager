import { Test, TestingModule } from '@nestjs/testing';
import { BudgetsResolver } from './budgets.resolver';
import { BudgetsService } from './budgets.service';

describe('BudgetsResolver', () => {
  let resolver: BudgetsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetsResolver, BudgetsService],
    }).compile();

    resolver = module.get<BudgetsResolver>(BudgetsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
