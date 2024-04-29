import { registerAs } from '@nestjs/config';

import { EnvConst } from '@config/env-const';
import { IDatabase } from '@config/config-interface';

export default registerAs(
  EnvConst.database,
  (): IDatabase => ({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  }),
);
