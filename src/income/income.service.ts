import { Injectable } from "@nestjs/common";
import { CreateIncomeInput } from "./dto/create-income.input";
import { PrismaService } from "nestjs-prisma";
import { FindIncomesInput } from "./dto/find-incomes.input";

@Injectable()
export class IncomeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createIncomeInput: CreateIncomeInput, userId: string) {
    const income = await this.prismaService.income.create({
      data: {
        ...createIncomeInput,
        userId,
      },
    });

    await this.prismaService.account.update({
      where: { id: createIncomeInput.accountId },
      data: {
        balance: {
          increment: createIncomeInput.amount,
        },
      },
    });

    return income;
  }

  async findAll(findIncomesInput: FindIncomesInput, userId: string) {
    const { page, limit, ...filters } = findIncomesInput;

    const skip = (page - 1) * limit;
    const take = limit;

    const [incomes, totalCount] = await Promise.all([
      this.prismaService.income.findMany({
        where: { userId, ...filters },
        skip,
        take,
        orderBy: {
          created_at: "desc",
        },
      }),
      this.prismaService.income.count({
        where: {
          userId,
          ...filters,
        },
      }),
    ]);

    return {
      data: incomes,
      page,
      limit,
      totalCount,
    };
  }

  async findOne(id: string, userId: string) {
    return await this.prismaService.income.findFirst({ where: { id, userId } });
  }
}
