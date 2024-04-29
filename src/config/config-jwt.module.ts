import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { EnvConst } from './env-const';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>(EnvConst.JWT_SECRET),
        signOptions: { expiresIn: '8h' },
      }),
    }),
  ],
})
export class ConfigJwtModule {}
