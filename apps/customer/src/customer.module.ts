import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { ConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
