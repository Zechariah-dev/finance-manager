import { Resolver } from '@nestjs/graphql';
import { BudgetsService } from './budgets.service';

@Resolver()
export class BudgetsResolver {
  constructor(private readonly budgetsService: BudgetsService) {}
}
