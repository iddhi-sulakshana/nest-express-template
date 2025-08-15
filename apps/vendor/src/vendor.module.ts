import { Module } from '@nestjs/common';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { ConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}
