import * as Joi from 'joi';
import { IEnvSchema } from './config-interface';

export const envSchema = Joi.object<IEnvSchema, true>({
  PORT: Joi.number().port().required(),

  ACCESS_KEY: Joi.string().required(),
  WEBHOOK_KEY: Joi.string().required(),

  DATABASE_HOST: Joi.string().hostname().required(),
  DATABASE_PORT: Joi.number().port().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required().allow(''),
  DATABASE_NAME: Joi.string().required(),

  DOCS_SERVER_URL: Joi.string()
    .regex(/^(\/[A-z\-]+)+$/)
    .default('/api'),

  REDOCLY_PATH: Joi.string()
    .regex(/^(\/[A-z\-]+)+$/)
    .default('/redoc'),
  SWAGGER_PATH: Joi.string()
    .regex(/^(\/[A-z\-]+)+$/)
    .default('/docs'),

  JWT_SECRET: Joi.string().required(),

  SWAPI_API: Joi.string().required(),
});
