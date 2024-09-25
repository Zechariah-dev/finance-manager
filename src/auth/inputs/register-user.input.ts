import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class RegisterInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  firstname: string;

  @Field(() => String)
  lastname: string;
}
