import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("NestApplication");

  const configService = app.get<ConfigService>(ConfigService);

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({ origin: "*" });

  const port = configService.get("PORT");

  // start app
  await app.listen(port, () => logger.log(`Server started on port ${port}`));
}

bootstrap();
