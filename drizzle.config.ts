// ignore whole file from ts
// @ts-nocheck
import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv-safe';

dotenv.config();

export default defineConfig({
  schema: './libs/database/src/schema/*',
  out: './libs/database/src/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
