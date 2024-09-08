import { ObjectType, Field, Float } from "@nestjs/graphql";

@ObjectType()
export class Income {
  @Field(() => String)
  id: string;

  @Field(() => String)
  source: string;

  @Field(() => Float)
  amount: number;

  @Field(() => String)
  accountId: string;

  @Field(() => String)
  userId: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}
