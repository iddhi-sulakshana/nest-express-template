/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@app/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
