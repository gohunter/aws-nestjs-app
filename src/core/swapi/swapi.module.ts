import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SwapiService } from './swapi.service';
import { SwapiController } from './swapi.controller';

@Module({
  imports: [HttpModule],
  controllers: [SwapiController],
  providers: [SwapiService],
})
export class SwapiModule {}
