import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class BudgetsService {
  constructor(private readonly prismaServie: PrismaService) {}

  async createBudget(data: Prisma.BudgetCreateInput) {
    return await this.prismaServie.budget.create({ data });
  }
}
