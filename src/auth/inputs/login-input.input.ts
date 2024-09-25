import { Field, InputType } from "@nestjs/graphql"
import { IsBoolean, IsEmail } from "class-validator";

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Boolean)
  @IsBoolean()
  remember_me: boolean;
}
