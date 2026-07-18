import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import helmet from '@fastify/helmet';
import compress from '@fastify/compress';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  await app.register(helmet);
  await app.register(compress);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api/v1');
  app.enableShutdownHooks();

  app.useLogger(app.get(Logger));

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port, '0.0.0.0');
  const logger = app.get(Logger);
  logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
