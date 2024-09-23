import { Field, ObjectType } from "@nestjs/graphql";
import { Range } from "@prisma/client";

@ObjectType()
export class Budget {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Range)
  type: Range;

  @Field(() => Number)
  amount: number;

  @Field(() => Date)
  startTime: Date;

  @Field(() => Date)
  endTime: Date;
}

