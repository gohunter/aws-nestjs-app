import { registerAs } from '@nestjs/config';

import { EnvConst } from '@config/env-const';
import { IRedocly } from '@config/config-interface';

export default registerAs(
  EnvConst.redocly,
  (): IRedocly => ({
    path: process.env.REDOCLY_PATH,
  }),
);
