export interface IEnvSchema {
  PORT: number;

  ACCESS_KEY: string;
  WEBHOOK_KEY: string;

  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string | undefined;
  DATABASE_NAME: string;

  DOCS_SERVER_URL: string;
  SWAGGER_PATH: string;
  REDOCLY_PATH: string;

  JWT_SECRET: string;

  SWAPI_API: string;
}

export interface IServer {
  port: number;
  pathRoot: string;
}

export interface ISwagger {
  url: string;
  path: string;
}

export interface IRedocly {
  path: string;
}

export interface IConfigLoader {
  server: IServer;
}

export interface IDatabase {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
