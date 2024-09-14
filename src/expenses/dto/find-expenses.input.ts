import { Field, InputType, Int } from "@nestjs/graphql";
import { ExpenseCategory } from "@prisma/client";

@InputType()
export class FindExpensesInput {
  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  limit: number;

  @Field(() => String, { nullable: true })
  accountId: string;

  @Field(() => String)
  category: ExpenseCategory;
}
