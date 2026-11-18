import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { readFileSync } from 'fs';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 5432),
    user: process.env.DB_USER,
    password: readFileSync(
      process.env.DB_PASSWORD_FILE ?? '/run/secrets/db_password',
      'utf8'
    ).trim(),
    database: process.env.DB_NAME,
  });

  query<T extends object>(sql: string, params?: unknown[]) {
    return this.pool.query<T>(sql, params);
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}