import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";
import { UpdateBudgetInput } from "./inputs/update-budget.input";

@Injectable()
export class BudgetsService {
  constructor(private readonly prismaServie: PrismaService) {}

  async findByName(name: string, userId: string) {
    return this.prismaServie.budget.findFirst({ where: { name, userId } });
  }

  async findById(id: string, userId: string) {
    return this.prismaServie.budget.findFirst({ where: { id, userId } });
  }

  async createBudget(data: Prisma.BudgetUncheckedCreateInput) {
    return this.prismaServie.budget.create({ data });
  }

  async deleteBudget(id: string) {
    return this.prismaServie.budget.delete({ where: { id } });
  }

  async updateBudget(id: string, data: Omit<UpdateBudgetInput, "budgetId">) {
    return this.prismaServie.budget.update({
      where: { id },
      data,
    });
  }
}
