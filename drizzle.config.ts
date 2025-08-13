import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv-safe';

dotenv.config();

export default defineConfig({
  schema: './src/database/schema/*',
  out: './src/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'nest_fastify_db',
  },
  verbose: true,
  strict: true,
});
