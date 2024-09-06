import { Args, Resolver } from "@nestjs/graphql";
import { BudgetsService } from "./budgets.service";
import { Mutation } from "@nestjs/graphql";
import { CreateBudgetInput } from "./models/create-budget.model";
import { Budget } from "../common/types/budget.model";

@Resolver("Budget")
export class BudgetsResolver {
  constructor(private readonly budgetsService: BudgetsService) {}

  // @Mutation(() => Budget)
  // async createBudget(
  //   @Args("createBudgeInput") createBudgetInput: CreateBudgetInput
  // ) {
  //   return await this.budgetsService.createBudget(createBudgetInput);
  // }

  
}
