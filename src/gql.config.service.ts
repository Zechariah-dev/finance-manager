import { ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigService } from "@nestjs/config";
import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";
import { GraphqlConfig } from "./common/configs/config.interface";

export class GqlConfigService implements GqlOptionsFactory {
  constructor(private configService: ConfigService) {}
  createGqlOptions(): ApolloDriverConfig {
    // const graphqlConfig = this.configService.get<GraphqlConfig>("graphql");
    const graphqlConfig = {
      playgroundEnabled: true,
      debug: true,
      schemaDestination: "./src/schema.graphql",
      sortSchema: true,
    };
    return {
      // schema options
      autoSchemaFile: graphqlConfig.schemaDestination || "./src/schema.graphql",
      sortSchema: graphqlConfig.sortSchema,
      buildSchemaOptions: {
        numberScalarMode: "integer",
      },
      // subscription
      installSubscriptionHandlers: true,
      includeStacktraceInErrorResponses: graphqlConfig.debug,
      playground: graphqlConfig.playgroundEnabled,
      context: ({ req }) => ({ req }),
    };
  }
}
