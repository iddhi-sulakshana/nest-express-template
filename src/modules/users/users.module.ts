import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UsersRepository } from '../../database/repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
