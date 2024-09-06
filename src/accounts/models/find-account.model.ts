import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class FindAccountInput {
    @Field(() => String)
    id: string;
}