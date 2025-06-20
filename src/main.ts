import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as express from 'express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useWebSocketAdapter(new IoAdapter(app));
  app.use(express.static(join(__dirname, '..', 'public')));

  await app.listen(3000);
}
bootstrap();