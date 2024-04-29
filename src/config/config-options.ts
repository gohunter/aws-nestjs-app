import { ConfigModuleOptions } from '@nestjs/config';
import { envSchema } from './env-schema';
import { configLoader } from './loaders/config-loader';
import databaseLoader from './loaders/database-loader';
import redoclyLoader from './loaders/redocly-loader';
import swaggerLoader from './loaders/swagger-loader';

export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [configLoader, swaggerLoader, redoclyLoader, databaseLoader],
  validationSchema: envSchema,
};
