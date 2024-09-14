import { InputType, Int, Field, Float } from "@nestjs/graphql";
import { ExpenseCategory } from "@prisma/client";

@InputType()
export class CreateExpenseInput {
  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String)
  category: ExpenseCategory;

  @Field(() => Float)
  amount: number;

  @Field(() => String)
  accountId: string;
}
