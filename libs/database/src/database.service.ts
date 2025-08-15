import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client!: postgres.Sql;
  public db!: ReturnType<typeof drizzle>;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.client = postgres(this.configService.get('DATABASE_URL'));

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
