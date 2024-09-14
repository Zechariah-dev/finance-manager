import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Expense } from "../entities/expense.entity";

@ObjectType()
export class FindExpensesResponse {
  @Field(() => [Expense])
  data: Expense[];

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalCount: number;
}
