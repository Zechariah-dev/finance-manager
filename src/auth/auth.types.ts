import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "../users/entities/user.entity";

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
