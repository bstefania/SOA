import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',  // 0.0.0.0
      port: 3003,
    },
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen();
  Logger.log('Recipes microservice running');
}

bootstrap();
