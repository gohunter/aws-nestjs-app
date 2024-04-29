import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@codegenie/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from '@common/helpers';
import helmet from 'helmet';
import { initApiDocs } from './app.docs';
import { ValidationPipe } from '@nestjs/common';
import { validationPipeOptions } from '@config/validation-pipe-options';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  app.use(helmet());

  await initApiDocs(app, configService);
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  app.enableShutdownHooks();

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
