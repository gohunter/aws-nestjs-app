import { ConfigFactory } from '@nestjs/config';
import { join } from 'path';

import { EnvConst } from '@config/env-const';
import { IConfigLoader } from '@config/config-interface';

export const configLoader: ConfigFactory = (): IConfigLoader => {
  return {
    [EnvConst.server]: {
      port: Number(process.env.PORT),
      pathRoot: join(__dirname, '..', '..', '..'),
    },
  };
};
