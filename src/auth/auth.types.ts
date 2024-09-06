import { User } from "src/common/types/user.model";
import { ObjectType, Field } from "@nestjs/graphql";

export type JwtPayload = {
  [key: string]: any;
};

@ObjectType()
export class Error {}

@ObjectType()
export class RegisterResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Error, { nullable: true })
  error?: Error;
}
