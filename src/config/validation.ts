import path from 'path';
import { config as dotenvConfig } from 'dotenv-safe';
import { Logger } from '@nestjs/common';

// Function to validate and transform env variables
export const validateEnv = (config: Record<string, any>) => {
  // constructing the path to the .env file located in root directory of the application
  const envPath = path.join(path.resolve(), '.env');

  // load environment variables from the .env file
  try {
    dotenvConfig({ path: envPath });
  } catch (error) {
    Logger.error(error, 'Config 🚧');
    process.exit(1);
  }

  // Validate the environment variables
  if (isNaN(Number(config.PORT))) {
    Logger.error('PORT must be a number', 'Config 🚧');
    process.exit(1);
  }

  try {
    new URL(config.DATABASE_URL);
  } catch (error) {
    Logger.error('DATABASE_URL must be a valid URL', 'Config 🚧');
    process.exit(1);
  }

  return config;
};
