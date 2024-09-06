import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsString, IsDate } from "class-validator";

@InputType()
export class CreateBudgetInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  type: string;

  @Field(() => Number)
  @IsNumber()
  amount: string;

  @Field(() => Date)
  @IsDate()
  startTime: Date;

  @Field(() => Date)
  @IsDate()
  endTime: Date;
}
