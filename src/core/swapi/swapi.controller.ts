import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SwapiService } from './swapi.service';

@ApiTags('Swapi')
@Controller('swapi')
export class SwapiController {
  constructor(private readonly swapiService: SwapiService) {}

  @Get('films')
  async findAllFilm() {
    return await this.swapiService.findAllFilm();
  }

  @Get('films/:id')
  async findOneFilm(@Param('id', ParseIntPipe) id: number) {
    return await this.swapiService.findOneFilm(id);
  }
}
