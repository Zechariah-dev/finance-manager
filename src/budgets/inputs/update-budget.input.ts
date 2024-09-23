import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateBudgetInput {
  @Field(() => String)
  budgetId: string

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => Number, { nullable: true })
  amount: number;

  @Field(() => Date, { nullable: true })
  startTime: Date;

  @Field(() => Date, { nullable: true })
  endTime: Date;
}
