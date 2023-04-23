import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private readonly logger = new Logger(TypeOrmConfigService.name);

  constructor(private config: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    interface DatabaseConfig {
      type: 'mysql' | 'mariadb' | 'postgres' | 'sqlite';
      host: string;
      port: number;
      databaseName: string;
      username: string;
      password: string;
    }

    const databaseInfo = this.config.get<DatabaseConfig>('database.mysql');
    return {
      type: databaseInfo.type,
      host: databaseInfo.host,
      port: databaseInfo.port,
      database: databaseInfo.databaseName,
      username: databaseInfo.username,
      password: databaseInfo.password,
      synchronize: false,
      entities: [__dirname + '/../**/entities/*.entity{.ts,js}'],
      migrations: [__dirname + '/../migrations/*{.ts,js}'],
    };
  }
}
