import { NestFactory } from '@nestjs/core';
import { VendorModule } from './vendor.module';
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
  const app = await NestFactory.create(VendorModule);

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
  app.setGlobalPrefix('api/v1/vendor', {
    exclude: ['/api-docs'],
  });

  // config swagger
  swaggerConfigService.configure(app);

  return app;
}

bootstrap().then((app) => {
  const portConfigService = app.get(PortConfigService);
  const port = portConfigService.getVendorPort();

  app
    .listen(port)
    .then(() => {
      Logger.log(`Vendor Service is running on port http://localhost:${port}`, 'Config 🚧');
    })
    .catch((error) => {
      Logger.error(error, 'Vendor Server 🚧');
      process.exit(1);
    });
});
