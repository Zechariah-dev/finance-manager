import { Field, Float, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Account {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Float)
  balance: number;

  @Field(() => String)
  currency: string;

  @Field(() => String)
  userId: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}

