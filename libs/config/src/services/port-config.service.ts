/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type AppType = 'app' | 'vendor' | 'customer';

@Injectable()
export class PortConfigService {
  constructor(private configService: ConfigService) {}

  getPortForApp(appType: AppType): number {
    const ports = this.configService.get('ports');
    return ports[appType];
  }

  getAppPort(): number {
    return this.getPortForApp('app');
  }

  getVendorPort(): number {
    return this.getPortForApp('vendor');
  }

  getCustomerPort(): number {
    return this.getPortForApp('customer');
  }
}
