import { Field, InputType } from "@nestjs/graphql";
import { Range } from "@prisma/client";
import { IsNumber, IsString, IsDate, IsEnum } from "class-validator";

@InputType()
export class CreateBudgetInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => Range)
  @IsEnum(Range)
  type: Range;

  @Field(() => Number)
  @IsNumber()
  amount: number;

  @Field(() => Date)
  @IsDate()
  startTime: Date;

  @Field(() => Date)
  @IsDate()
  endTime: Date;
}
