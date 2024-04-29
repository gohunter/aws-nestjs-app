import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { validationPipeOptions } from '@config/validation-pipe-options';
import { HttpExceptionFilter } from '@common/helpers/filters';
import { IServer } from '@config/config-interface';
import { EnvConst } from '@config/env-const';

import { AppModule } from './app.module';
import { initApiDocs } from './app.docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const { port } = configService.get<IServer>(EnvConst.server);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  app.use(helmet());

  await initApiDocs(app, configService);
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  app.enableShutdownHooks();
  await app.listen(port);
  Logger.log(`Server run: ${await app.getUrl()}`);
}
bootstrap();
