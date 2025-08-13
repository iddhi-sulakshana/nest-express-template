import path from 'path';
import { config } from 'dotenv-safe';
import { Logger } from '@nestjs/common';

// constructing the path to the .env file located in root directory of the application
const envPath = path.join(path.resolve(), '.env');

// load environment variables from the .env file
config({ path: envPath });

// Set default environment to 'development' if not specified
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

export default function configEnvironment() {
  // / Logging information if running in the development environment
  if (process.env.NODE_ENV === 'development') {
    // Want to show these logs as config just like [NestFactory] doing its logging

    Logger.log('Node running as Development Environment', 'Config 🚧');
    Logger.log(`Enviroment Variables Loaded: ${envPath}`, 'Config 🚧');
  }
}
