import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, map } from 'rxjs';

import { EnvConst } from '@config/env-const';
import { SwapiFilm, SwapiFilmEs, SwapiResult } from './models';
import { AxiosResponse } from 'axios';
import { adapterSwapiFilmToEs } from './helpers';

@Injectable()
export class SwapiService {
  readonly swapiApi: string = this.configService.get<string>(
    EnvConst.SWAPI_API,
  );

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async findAllFilm() {
    const url = `${this.swapiApi}films/`;
    const { data } = await firstValueFrom(
      this.httpService.get<SwapiResult<SwapiFilm>>(url, {}).pipe(
        map((res): AxiosResponse<SwapiResult<SwapiFilmEs>> => {
          return {
            ...res,
            data: {
              ...res.data,
              results: res.data?.results?.map(
                (item): SwapiFilmEs => adapterSwapiFilmToEs(item),
              ),
            },
          };
        }),
        catchError((e) => {
          throw new HttpException(e?.response?.data, e?.response?.status);
        }),
      ),
    );
    return data;
  }

  async findOneFilm(id: number) {
    const url = `${this.swapiApi}films/${id}/`;
    const { data } = await firstValueFrom(
      this.httpService.get<SwapiFilm>(url, {}).pipe(
        map((res): AxiosResponse<SwapiFilmEs> => {
          return { ...res, data: adapterSwapiFilmToEs(res.data) };
        }),
        catchError((e) => {
          throw new HttpException(e?.response?.data, e?.response?.status);
        }),
      ),
    );
    return data;
  }
}
