import { InputType, Field, Float } from "@nestjs/graphql";

@InputType()
export class CreateIncomeInput {
  @Field(() => String, { description: "income source" })
  source: string;

  @Field(() => Float)
  amount: number;

  @Field(() => String)
  accountId: string;
}
