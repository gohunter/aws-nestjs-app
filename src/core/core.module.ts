import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { SwapiModule } from './swapi/swapi.module';

@Module({
  imports: [UserModule, SwapiModule],
})
export class CoreModule {}
