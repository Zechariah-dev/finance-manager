import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Income } from "../entities/income.entity";

@ObjectType()
export class FindIncomesResponse {
  @Field(() => [Income])
  data: Income[];

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalCount: number;
}
