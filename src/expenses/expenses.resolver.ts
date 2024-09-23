import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ExpensesService } from "./expenses.service";
import { Expense } from "./entities/expense.entity";
import { CreateExpenseInput } from "./dto/create-expense.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/gql.-auth.guard";
import { CurrentUser } from "src/common/decorators/current-user";
import { FindExpensesInput } from "./dto/find-expenses.input";
import { FindExpensesResponse } from "./responses/find-expenses.response";
import { AccountsService } from "src/accounts/accounts.service";
import { GraphQLError } from "graphql";
import { User } from "../users/entities/user.entity";

@UseGuards(GqlAuthGuard)
@Resolver(() => Expense)
export class ExpensesResolver {
  constructor(
    private readonly expensesService: ExpensesService,
    private readonly accountService: AccountsService
  ) {}

  @Mutation(() => Expense)
  async createExpense(
    @CurrentUser() user: User,
    @Args("createExpenseInput") createExpenseInput: CreateExpenseInput
  ) {
    const isBalanceSufficient =
      await this.accountService.checkBalanceSufficiency(
        createExpenseInput.accountId,
        user.id,
        createExpenseInput.amount
      );

    if (!isBalanceSufficient) {
      throw new GraphQLError("account balance is insufficient");
    }

    return this.expensesService.create(createExpenseInput, user.id);
  }

  @Query(() => FindExpensesResponse)
  async findUserExpenses(
    @CurrentUser() user: User,
    @Args("findExpensesInput") findExpensesInput: FindExpensesInput
  ) {
    return this.expensesService.findByUser(findExpensesInput, user.id);
  }

  @Query(() => Expense)
  async findOne(@Args("id", { type: () => String }) id: string) {
    return this.expensesService.findOne(id);
  }
}
