import { ObjectType, Field, Int, Float } from "@nestjs/graphql";

@ObjectType()
export class Expense {
  @Field(() => String)
  id: String;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => Float)
  amount: number;

  @Field(() => String)
  category: string;

  @Field(() => String)
  userId: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}
