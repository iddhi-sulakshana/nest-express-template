import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { getDatabaseConfig } from './database.config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client: postgres.Sql;
  public db: ReturnType<typeof drizzle>;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const config = getDatabaseConfig(this.configService);

    this.client = postgres({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
      max: config.max,
      idle_timeout: config.idleTimeoutMillis,
      connect_timeout: config.connectionTimeoutMillis,
    });

    this.db = drizzle(this.client);
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.end();
    }
  }

  getDb() {
    return this.db;
  }
}
