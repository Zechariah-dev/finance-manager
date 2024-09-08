import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { IncomeService } from "./income.service";
import { Income } from "./entities/income.entity";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/gql.-auth.guard";
import { CurrentUser } from "src/common/decorators/current-user";
import { User } from "../common/types/user.model";
import { FindIncomesInput } from "./dto/find-incomes.input";
import { CreateIncomeInput } from "./dto/create-income.input";
import { FindIncomesResponse } from "./response/find-incomes.response";

@UseGuards(GqlAuthGuard)
@Resolver(() => Income)
export class IncomeResolver {
  constructor(private readonly incomeService: IncomeService) { }

  @Mutation(() => Income)
  createIncome(
    @CurrentUser() user: User,
    @Args("createIncomeInput") createIncomeInput: CreateIncomeInput
  ) {
    return this.incomeService.create(createIncomeInput, user.id);
  }

  @Query(() => FindIncomesResponse)
  findIncomes(
    @CurrentUser() user: User,
    @Args("findIncomesInput") findIncomesInput: FindIncomesInput
  ) {
    return this.incomeService.findAll(findIncomesInput, user.id);
  }

  @Query(() => Income)
  findIncome(
    @Args("id", { type: () => String }) id: string,
    @CurrentUser() user: User
  ) {
    return this.incomeService.findOne(id, user.id);
  }
}
