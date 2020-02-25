import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from "./AppModule";
import {HttpExceptionFilter} from "./HttpExceptionFilter";


const VERSION = 'v1';


async function bootstrap()
{
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(VERSION);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  await app.listen(3000);
}

bootstrap();
