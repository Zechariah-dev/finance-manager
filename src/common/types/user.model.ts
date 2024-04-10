import { Field, ObjectType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  firstname: string;

  @Field(() => String)
  lastname: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}
