import { ArgumentsHost, BadRequestException, Catch } from "@nestjs/common";
import { GqlExceptionFilter } from "@nestjs/graphql";
import { ApolloError } from "apollo-server-express"

@Catch(BadRequestException)
export class GraphQlErrorFilter implements GqlExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const response = exception.getResponse();

    if (typeof response === 'object') {
      throw new ApolloError('validation error', 'VALIDATION_ERROR')
    } else {
      throw new ApolloError("Bad Request")
    }
  }
}
