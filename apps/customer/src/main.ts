import { NestFactory } from '@nestjs/core';
import { CustomerModule } from './customer.module';
import {
  EnvironmentConfigService,
  CorsConfigService,
  SwaggerConfigService,
  ValidationConfigService,
  LoggingConfigService,
  PortConfigService,
} from '@app/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(CustomerModule);

  // Get config services from the app context
  const environmentConfigService = app.get(EnvironmentConfigService);
  const corsConfigService = app.get(CorsConfigService);
  const loggingConfigService = app.get(LoggingConfigService);
  const validationConfigService = app.get(ValidationConfigService);
  const swaggerConfigService = app.get(SwaggerConfigService);

  // config environment (already configured in service constructor)
  environmentConfigService.configure();

  // config cors
  corsConfigService.configure(app);

  // Config http request logger
  loggingConfigService.configure(app);

  // config validation pipe
  validationConfigService.configure(app);

  // config global prefix
  app.setGlobalPrefix('api/v1/customer', {
    exclude: ['/api-docs'],
  });

  // config swagger
  swaggerConfigService.configure(app);

  return app;
}

bootstrap().then((app) => {
  const portConfigService = app.get(PortConfigService);
  const port = portConfigService.getCustomerPort();

  app
    .listen(port)
    .then(() => {
      Logger.log(`Customer Service is running on port http://localhost:${port}`, 'Config 🚧');
    })
    .catch((error) => {
      Logger.error(error, 'Customer Server 🚧');
      process.exit(1);
    });
});
