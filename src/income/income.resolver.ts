import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { IncomeService } from "./income.service";
import { Income } from "./entities/income.entity";
import {
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { GqlAuthGuard } from "../auth/gql.-auth.guard";
import { CurrentUser } from "../common/decorators/current-user";
import { FindIncomesInput } from "./inputs/find-incomes.input";
import { CreateIncomeInput } from "./inputs/create-income.input";
import { FindIncomesResponse } from "./response/find-incomes.response";
import { User } from "../users/entities/user.entity";

@UseGuards(GqlAuthGuard)
@Resolver(() => Income)
export class IncomeResolver {
  constructor(private readonly incomeService: IncomeService) {}

  @Mutation(() => Income)
  async createIncome(
    @CurrentUser() user: User,
    @Args("createIncomeInput") createIncomeInput: CreateIncomeInput
  ) {
    const createdIncome = await this.incomeService.create(
      createIncomeInput,
      user.id
    );

    if (!createdIncome) {
      throw new InternalServerErrorException("Failed to created income");
    }

    return createdIncome;
  }

  @Query(() => FindIncomesResponse)
  findIncomes(
    @CurrentUser() user: User,
    @Args("findIncomesInput") findIncomesInput: FindIncomesInput
  ) {
    return this.incomeService.findAll(findIncomesInput, user.id);
  }

  @Query(() => Income)
  async findIncome(
    @Args("id", { type: () => String }) id: string,
    @CurrentUser() user: User
  ) {
    const income = await this.incomeService.findOne(id, user.id);

    if (!income) {
      throw new NotFoundException("Income not found");
    }

    return income;
  }
}
