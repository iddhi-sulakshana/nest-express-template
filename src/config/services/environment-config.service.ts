import { Injectable, Logger } from '@nestjs/common';
import path from 'path';
import { config } from 'dotenv-safe';

@Injectable()
export class EnvironmentConfigService {
  private readonly logger = new Logger(EnvironmentConfigService.name);

  constructor() {
    this.loadEnvironment();
  }

  private loadEnvironment(): void {
    // constructing the path to the .env file located in root directory of the application
    const envPath = path.join(path.resolve(), '.env');

    // load environment variables from the .env file
    config({ path: envPath });

    // Set default environment to 'development' if not specified
    if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

    // Logging information if running in the development environment
    if (process.env.NODE_ENV === 'development') {
      this.logger.log('Node running as Development Environment', 'Config 🚧');
      this.logger.log(`Environment Variables Loaded: ${envPath}`, 'Config 🚧');
    }
  }

  configure(): void {
    // Environment is already configured in constructor
    this.logger.log('Environment configuration completed', 'Config 🚧');
  }
}
