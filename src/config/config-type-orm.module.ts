import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

import { EnvConst } from './env-const';
import { IDatabase } from './config-interface';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        ...config.get<IDatabase>(EnvConst.database),
        entities: [join(__dirname, '..', './**/**/*entity{.ts,.js}')],
        autoLoadEntities: true,
        synchronize: false,
        logging: ['error'],
        logger: 'file',
        charset: 'utf8mb4',
        // timezone: '+00:00',
      }),
    }),
  ],
})
export class ConfigTypeOrmModule {}
