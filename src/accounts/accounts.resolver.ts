import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { AccountsService } from "./accounts.service";
import { Account } from "../common/types/account.model";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/gql.-auth.guard";
import { CurrentUser } from "../common/decorators/current-user";
import { User } from "../common/types/user.model";
import { CreateAccountInput } from "./models/create-account.model";
import { UserInputError } from "apollo-server-express";
import { FindAccountInput } from "./models/find-account.model";

@Resolver("Account")
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Account)
  async createAccount(
    @CurrentUser() user: User,
    @Args("createAccountInput") createAccountInput: CreateAccountInput
  ) {
    const existingAccount = await this.accountsService.findExisting(
      createAccountInput.name,
      user.id
    );

    if (existingAccount) {
      throw new UserInputError("Account with provided name already exists");
    }

    return this.accountsService.create({
      ...createAccountInput,
      userId: user.id,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Account)
  findUserAccount(
    @CurrentUser() user: User,
    @Args("findAccountInput") findAccountInput: FindAccountInput
  ) {
    return this.accountsService.findByIdAndUser(findAccountInput.id, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Account])
  async findUserAccounts(@CurrentUser() user: User) {
    return this.accountsService.findAccountsByUserId(user.id);
  }
}
