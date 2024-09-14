import { Module } from "@nestjs/common";
import { ExpensesService } from "./expenses.service";
import { ExpensesResolver } from "./expenses.resolver";
import { AccountsService } from "../accounts/accounts.service";
import { PrismaService } from "nestjs-prisma";

@Module({
  providers: [
    ExpensesResolver,
    ExpensesService,
    AccountsService,
    PrismaService,
  ],
})
export class ExpensesModule {}
