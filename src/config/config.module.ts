/* eslint-disable prettier/prettier */
// src/config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { validateEnv } from './validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available everywhere
      load: [configuration], // custom loader
      validate: validateEnv, // zod validation
    }),
  ],
})
export class ConfigModule {}
