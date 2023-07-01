import { Resolver, Query, Args } from "@nestjs/graphql";

@Resolver()
export class AppResolver {
  @Query(() => String)
  sayHello(): string {
    return "Hello World!";
  }
}
