import { registerAs } from '@nestjs/config';

import { EnvConst } from '@config/env-const';
import { ISwagger } from '@config/config-interface';

export default registerAs(
  EnvConst.swagger,
  (): ISwagger => ({
    url: process.env.DOCS_SERVER_URL,
    path: process.env.SWAGGER_PATH,
  }),
);
