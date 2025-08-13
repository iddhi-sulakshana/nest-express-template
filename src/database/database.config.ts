import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService) => ({
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  user: configService.get<string>('DB_USER', 'postgres'),
  password: configService.get<string>('DB_PASSWORD', 'password'),
  database: configService.get<string>('DB_NAME', 'nest_fastify_db'),
  max: configService.get<number>('DB_POOL_MAX', 10),
  idleTimeoutMillis: configService.get<number>('DB_IDLE_TIMEOUT', 30000),
  connectionTimeoutMillis: configService.get<number>(
    'DB_CONNECTION_TIMEOUT',
    2000,
  ),
});
