import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { join } from 'path';
import { EnvConst } from './env-const';
import { IServer } from './config-interface';

@Module({
  imports: [
    NestjsFormDataModule.configAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const { pathRoot } = config.get<IServer>(EnvConst.server);
        const fileSystemStoragePath = join(pathRoot, 'tmp');
        return {
          isGlobal: true,
          storage: FileSystemStoredFile,
          fileSystemStoragePath,
          autoDeleteFile: true,
        };
      },
    }),
  ],
})
export class ConfigFormDataModule {}
