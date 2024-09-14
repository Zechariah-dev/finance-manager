import { Injectable } from "@nestjs/common";
import { CreateExpenseInput } from "./dto/create-expense.input";
import { PrismaService } from "nestjs-prisma";
import { Prisma } from "@prisma/client";
import { FindExpensesInput } from "./dto/find-expenses.input";

@Injectable()
export class ExpensesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createExpenseInput: CreateExpenseInput, userId: string) {
    return await this.prismaService.$transaction(async (trx) => {
      const expense = await trx.expense.create({
        data: {
          ...createExpenseInput,
          userId,
        } as Prisma.ExpenseUncheckedCreateInput,
      });

      await trx.account.update({
        where: {
          id: createExpenseInput.accountId,
        },
        data: {
          balance: {
            decrement: createExpenseInput.amount,
          },
        },
      });

      return expense;
    });
  }

  async findByUser(findExpensesInput: FindExpensesInput, userId: string) {
    const { page, limit, ...filters } = findExpensesInput;

    const skip = (page - 1) * limit;
    const take = limit;

    const [expenses, totalCount] = await Promise.all([
      this.prismaService.expense.findMany({
        where: { userId, ...filters },
        skip,
        take,
        orderBy: {
          created_at: "desc",
        },
      }),
      this.prismaService.expense.count({
        where: {
          userId,
          ...filters,
        },
      }),
    ]);

    return {
      data: expenses,
      page,
      limit,
      totalCount,
    };
  }

  async findOne(id: string) {
    return await this.prismaService.expense.findFirst({
      where: { id: id },
    });
  }
}
