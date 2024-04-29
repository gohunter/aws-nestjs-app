import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { ConfigModule } from '@config/config.module';
import { ConfigTypeOrmModule } from '@config/config-type-orm.module';
import { ConfigFormDataModule } from '@config/config-form-data.module';
import { ConfigJwtModule } from '@config/config-jwt.module';
import { CoreModule } from '@core/core.module';

@Module({
  imports: [
    ConfigModule,
    ConfigTypeOrmModule,
    EventEmitterModule.forRoot(),
    ConfigFormDataModule,
    ConfigJwtModule,
    CoreModule,
  ],
})
export class AppModule {}
