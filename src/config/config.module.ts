import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { configOptions } from './config-options';

@Module({
  imports: [NestConfigModule.forRoot(configOptions)],
})
export class ConfigModule {}
