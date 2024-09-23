import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class FindIncomesInput {
  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  limit: number;

  @Field(() => String, { nullable: true })
  source: string;

  @Field(() => String, { nullable: true })
  accountId: string;
}
