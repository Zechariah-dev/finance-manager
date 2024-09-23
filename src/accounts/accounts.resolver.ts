import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { AccountsService } from "./accounts.service";
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { GqlAuthGuard } from "../auth/gql.-auth.guard";
import { CurrentUser } from "../common/decorators/current-user";
import { CreateAccountInput } from "./models/create-account.model";
import { UserInputError } from "apollo-server-express";
import { UpdateAccountInput } from "./models/update-account.modelt";
import { Account } from "./entities/account.entity";
import { User } from "../users/entities/user.entity";

@Resolver("Account")
@UseGuards(GqlAuthGuard)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Mutation(() => Account)
  async createAccount(
    @CurrentUser() user: User,
    @Args("createAccountInput") createAccountInput: CreateAccountInput
  ) {
    try {
      const existingAccount = await this.accountsService.findExistingAccount({
        name: createAccountInput.name,
        currency: createAccountInput.currency,
        userId: user.id,
      });

      if (existingAccount) {
        throw new UserInputError("Account with provided name already exists");
      }

      return this.accountsService.create({
        ...createAccountInput,
        userId: user.id,
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException("Failed to create account");
    }
  }

  @Mutation(() => Account)
  async updateAccount(
    @CurrentUser() user: User,
    @Args("updateAccountInput") updateAccountInput: UpdateAccountInput
  ) {
    try {
      const account = await this.accountsService.findByIdAndUser(
        updateAccountInput.accountId,
        user.id
      );

      if (!account) {
        throw new NotFoundException("Account not found");
      }

      if (updateAccountInput.name) {
        const existingAccount = await this.accountsService.findExistingAccount({
          name: updateAccountInput.name,
          userId: user.id,
        });

        if (existingAccount && existingAccount.id !== account.id) {
          throw new BadRequestException(
            "An account with this name already exists"
          );
        }
      }

      return await this.accountsService.updateAccount(
        updateAccountInput.accountId,
        updateAccountInput
      );
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException("Failed to update account");
    }
  }

  @Query(() => Account)
  async findUserAccount(
    @CurrentUser() user: User,
    @Args("id", { type: () => String }) id: string
  ) {
    try {
      const account = await this.accountsService.findByIdAndUser(id, user.id);

      if (!account) {
        throw new NotFoundException("Account not found");
      }

      return account;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }

      console.log(e);
      throw new InternalServerErrorException("Failed to fetch user account");
    }
  }

  @Query(() => [Account])
  async findUserAccounts(@CurrentUser() user: User) {
    try {
      return await this.accountsService.findAccountsByUserId(user.id);
    } catch (error) {
      throw new InternalServerErrorException("Failed to fetch user accounts");
    }
  }

  @Mutation(() => Boolean)
  async deleteAccount(
    @CurrentUser() user: User,
    @Args("id") id: string
  ): Promise<boolean> {
    try {
      const account = await this.accountsService.findByIdAndUser(id, user.id);

      if (!account) {
        throw new NotFoundException("Account not found");
      }

      const result = await this.accountsService.deleteAccount(id);

      if (!result) {
        throw new InternalServerErrorException("Failed to delete account");
      }

      return true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        "An error occurred while deleting the account"
      );
    }
  }
}
