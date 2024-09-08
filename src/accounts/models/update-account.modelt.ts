import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateAccountInput {
  @Field(() => String)
  accountId: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Float)
  balance: number;
}
