import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedocModule } from 'nest-redoc';

import { IRedocly, ISwagger } from '@config/config-interface';
import { EnvConst } from '@config/env-const';

export const initApiDocs = async (
  app: INestApplication,
  configService: ConfigService,
) => {
  const { url, path: swaggerPath } = configService.get<ISwagger>(
    EnvConst.swagger,
  );

  const { path: redoclyPath } = configService.get<IRedocly>(EnvConst.redocly);

  const config = new DocumentBuilder()
    .setTitle('APP OBRA API')
    .addBearerAuth()
    .setDescription('Documentation for internal REST API services.')
    .addServer('/', 'Path Base')
    .addServer(url, 'API in VPS')
    .addApiKey({
      type: 'apiKey',
      name: 'AccessKey',
      description: 'API Key for external calls',
    })
    .build();

  const sharedDocument = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(swaggerPath, app, sharedDocument);
  await RedocModule.setup(redoclyPath, app, sharedDocument);
};
