import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    this.config.get<string>('database.mysql');
    return {
      type: 'mysql',
      host: this.config.get<string>('database.mysql.host'),
      port: this.config.get<number>('database.mysql.port'),
      database: this.config.get<string>('database.mysql.database'),
      username: this.config.get<string>('database.mysql.username'),
      password: this.config.get<string>('database.mysql.password'),
      synchronize: false,
      entities: [__dirname + '/../**/entities/*.entity{.ts,js}'],
      migrations: [__dirname + '/../migrations/*{.ts,js}'],
    };
  }
}
