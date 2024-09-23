import { Args, Resolver, Mutation } from "@nestjs/graphql";
import { BudgetsService } from "./budgets.service";
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { GqlAuthGuard } from "../auth/gql.-auth.guard";
import { User } from "../users/entities/user.entity";
import { CurrentUser } from "../common/decorators/current-user";
import { Budget } from "./entities/budget.entity";
import { CreateBudgetInput } from "./inputs/create-budget.input";
import { UpdateBudgetInput } from "./inputs/update-budget.input";

@Resolver("Budget")
@UseGuards(GqlAuthGuard)
export class BudgetsResolver {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Mutation(() => Budget)
  async createBudget(
    @CurrentUser() user: User,
    @Args("createBudgeInput") createBudgetInput: CreateBudgetInput
  ) {
    const budgetExists = await this.budgetsService.findByName(
      createBudgetInput.name,
      user.id
    );

    if (budgetExists) {
      throw new BadRequestException("Budget with name already exists");
    }

    const budget = await this.budgetsService.createBudget({
      ...createBudgetInput,
      userId: user.id,
    });

    if (!budget) {
      throw new InternalServerErrorException("Failed to create budget");
    }

    return budget;
  }

  @Mutation(() => Boolean)
  async deleteBudget(
    @CurrentUser() user: User,
    @Args("id", { type: () => String }) id: string
  ) {
    const budget = await this.budgetsService.findById(id, user.id);
    if (!budget) {
      throw new NotFoundException("Budget not found");
    }

    const deletedBudget = await this.budgetsService.deleteBudget(id);

    if (!deletedBudget) {
      throw new InternalServerErrorException("Failed to delete budget");
    }

    return !!deletedBudget;
  }

  @Mutation(() => Budget)
  async updateBudget(
    @CurrentUser() user: User,
    @Args("updateBudgetInput") updateBudgetInput: UpdateBudgetInput
  ) {
    const budget = await this.budgetsService.findById(
      updateBudgetInput.budgetId,
      user.id
    );
    if (!budget) {
      throw new NotFoundException("Budget not found");
    }

    const updatedBudget = await this.budgetsService.updateBudget(
      updateBudgetInput.budgetId,
      updateBudgetInput
    );

    if (!updatedBudget) {
      throw new InternalServerErrorException("Failed to update budget");
    }

    return updatedBudget;
  }
}
