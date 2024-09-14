import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";
import { UpdateAccountInput } from "./models/update-account.modelt";

@Injectable()
export class AccountsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.AccountUncheckedCreateInput) {
    return await this.prismaService.account.create({ data });
  }

  async findExistingAccount(
    where: Pick<Prisma.AccountWhereInput, "name" | "currency" | "userId">
  ) {
    return await this.prismaService.account.findFirst({
      where,
    });
  }

  async findAccountsByUserId(userId: string) {
    return await this.prismaService.account.findMany({
      where: {
        userId,
      },
    });
  }

  findByIdAndUser(id: string, userId: string) {
    return this.prismaService.account.findFirst({ where: { id, userId } });
  }

  updateAccount(id: string, data: Omit<UpdateAccountInput, "accountId">) {
    return this.prismaService.account.update({ where: { id }, data });
  }

  async checkBalanceSufficiency(
    accountId: string,
    userId: string,
    amount: number
  ) {
    const account = await this.prismaService.account.findFirst({
      where: { id: accountId },
    });

    return account.balance > amount;
  }
}
