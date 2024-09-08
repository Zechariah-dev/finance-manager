import { Args, Resolver } from "@nestjs/graphql";
import { BudgetsService } from "./budgets.service";
import { Mutation } from "@nestjs/graphql";
import { CreateBudgetInput } from "./models/create-budget.model";
import { Budget } from "../common/types/budget.model";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/gql.-auth.guard";

@Resolver("Budget")
export class BudgetsResolver {
  constructor(private readonly budgetsService: BudgetsService) {}

  // @UseGuards(GqlAuthGuard)
  // @Mutation(() => Budget)
  // async createBudget(
  //   @Args("createBudgeInput") createBudgetInput: CreateBudgetInput
  // ) {
  //   return await this.budgetsService.createBudget({ ...budge});
  // }
}
