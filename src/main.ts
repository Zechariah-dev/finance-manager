import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { PrismaClientExceptionFilter, PrismaService } from "nestjs-prisma";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // enable shutdown hook
  // const prismaService: PrismaService = app.get(PrismaService);
  // await prismaService.enableShutdownHooks(app);

  // Prisma Client Exception Filter for unhanlded exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
