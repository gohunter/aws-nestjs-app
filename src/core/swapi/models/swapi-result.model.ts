export class SwapiResult<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}
