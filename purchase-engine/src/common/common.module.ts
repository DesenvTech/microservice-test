import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { databaseConfig } from 'src/common/config/database.config';
import { CommonModuleOptions } from './interfaces/common-module-options.interface';

@Module({})
export class CommonModule {
  static register(options: CommonModuleOptions): DynamicModule {
    return {
      module: CommonModule,
      imports: [
        ConfigModule.forRoot({ ...options.configModule }),
        ConfigModule.forFeature(databaseConfig()),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: async (
            configService: ConfigService,
          ): Promise<TypeOrmModuleOptions> => {
            return {
              type: configService.get<'mysql' | 'mariadb'>('database.type'),
              host: configService.get<string>('database.host'),
              port: configService.get<number>('database.port'),
              username: configService.get<string>('database.username'),
              password: configService.get<string>('database.password'),
              database: configService.get<string>('database.name'),
              synchronize: false,
              entities: [],
              autoLoadEntities: true,
            };
          },
        }),
      ],
      providers: [],
      controllers: [],
      exports: [],
    };
  }
}
