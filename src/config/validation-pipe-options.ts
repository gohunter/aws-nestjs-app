import { ValidationPipeOptions } from '@nestjs/common';

export const validationPipeOptions: ValidationPipeOptions = {
  whitelist: true,
  stopAtFirstError: false,
  forbidNonWhitelisted: false,
  transform: true,
};
