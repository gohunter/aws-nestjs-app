import { IsNumber, Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export interface PaginatedResults<T> {
  totalMatchCount: number;
  items: T[];
}

interface TakeAndSkip {
  take: number;
  skip: number;
}

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(500)
  take?: number;

  getTakeAndSkip(
    defaultTake: number = 25,
    defaultPage: number = 1,
  ): TakeAndSkip {
    const take = this.take || defaultTake;
    const page = this.page || defaultPage;
    const skip = (page - 1) * take;

    return { take, skip };
  }
}
