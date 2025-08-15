import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { UsersRepository } from './repositories';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [DatabaseService, UsersRepository],
  exports: [DatabaseService, UsersRepository],
})
export class DatabaseModule {}
