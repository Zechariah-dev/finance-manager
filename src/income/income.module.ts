import { Module } from "@nestjs/common";
import { IncomeService } from "./income.service";
import { IncomeResolver } from "./income.resolver";
import { PrismaService } from "nestjs-prisma";

@Module({
  providers: [IncomeResolver, IncomeService, PrismaService],
})
export class IncomeModule { }
