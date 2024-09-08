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

  async findExisting(name: string, userId: string) {
    return await this.prismaService.account.findFirst({
      where: { name, userId },
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
}
