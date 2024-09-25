import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";

@ObjectType()
class TokensType {
  @Field()
  access_token: string;

  @Field()
  refresh_token: string;
}


@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;

  @Field(() => TokensType)
  tokens: TokensType;
}


