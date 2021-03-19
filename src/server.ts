import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import FastifyCompress from 'fastify-compress';
import FastifyHelmet from 'fastify-helmet';
import FastifyMultipart from 'fastify-multipart';
import FastifyRateLimit from 'fastify-rate-limit';
import Handlebars from 'handlebars';
import { join } from 'path';
import PointOfView from 'point-of-view';
import HttpExceptionsFilter from './infrastructure/filters/http-exceptions.filter';
import AppModule from './modules/app/app.module';
import { ConfigService, LoggerService } from './shared/services';
import SharedModule from './shared/shared.module';

/**
 * NOTE
 * Change entryFile from `main.ts` to `server.ts`
 * for using Azure App Service
 * https://docs.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#run-with-pm2
 * You can change entryFile in `nest-cli.json`
 */
async function bootstrap() {
  const adapter = new FastifyAdapter();
  adapter.register(FastifyCompress);
  adapter.register(FastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  adapter.register(FastifyRateLimit, {
    timeWindow: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  adapter.register(FastifyMultipart);
  adapter.register(PointOfView, {
    engine: {
      handlebars: Handlebars,
    },
    templates: join(__dirname, '..', 'views'),
  });
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);
  const configService = app.select(SharedModule).get(ConfigService);
  const loggerService = app.select(SharedModule).get(LoggerService);
  app.useLogger(loggerService);
  const options = new DocumentBuilder()
    .setTitle('API v1')
    .setDescription('The boilerplate API for nest.js')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: `JWT Authorization header using the Bearer scheme.
\r\n\r\nEnter 'Bearer' [space] and then your token in client application.
\r\n\r\nExample: 'Bearer 12345abcdef'`,
      name: 'Authorization',
      in: 'Header',
      scheme: 'Bearer',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionsFilter(loggerService));

  // Starts listening for shutdown hooks for `Health Check`
  // NOTE: `https://docs.nestjs.com/fundamentals/lifecycle-events#application-shutdown`
  app.enableShutdownHooks();

  await app.listen(configService.port, configService.host);
}

bootstrap();
