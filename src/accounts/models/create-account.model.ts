import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class CreateAccountInput {
  @Field(() => String)
  name: string;

  @Field(() => Float)
  balance: number;

  @Field(() => String)
  currency: string;
}
