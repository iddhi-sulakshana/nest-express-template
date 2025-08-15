/* eslint-disable prettier/prettier */
// src/config/config.module.ts
import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { validateEnv } from './validation';
import {
  EnvironmentConfigService,
  CorsConfigService,
  SwaggerConfigService,
  ValidationConfigService,
  LoggingConfigService,
  PortConfigService,
} from './services';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available everywhere
      load: [configuration], // custom loader
      validate: validateEnv, // zod validation
    }),
  ],
  providers: [
    EnvironmentConfigService,
    CorsConfigService,
    SwaggerConfigService,
    ValidationConfigService,
    LoggingConfigService,
    PortConfigService,
  ],
  exports: [
    EnvironmentConfigService,
    CorsConfigService,
    SwaggerConfigService,
    ValidationConfigService,
    LoggingConfigService,
    PortConfigService,
  ],
})
export class ConfigModule {}
