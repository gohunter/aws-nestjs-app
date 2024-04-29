import { ValueTransformer } from 'typeorm';
import { isNullOrUndefined } from '../utils';

export class ColumnNumericTransformer implements ValueTransformer {
  to(data?: number | null): number | null {
    if (!isNullOrUndefined(data)) {
      return data;
    }
    return null;
  }

  from(data?: string | null): number | null {
    if (!isNullOrUndefined(data)) {
      const res = parseFloat(data);
      if (isNaN(res)) {
        return null;
      }
      return res;
    }
    return null;
  }
}

export class ColumnBooleanTransformer implements ValueTransformer {
  to(data?: number | null): number | null {
    if (!isNullOrUndefined(data)) {
      return data;
    }
    return null;
  }

  from(data?: number | null): boolean | null {
    return Boolean(data);
  }
}

export class ColumnDateTransformer implements ValueTransformer {
  to(value: Date) {
    if (!value) return null;
    return value.toISOString().slice(0, 10);
  }

  from(value: string) {
    return new Date(value);
  }
}
