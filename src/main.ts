/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configEnvironment from './config/environment.config';
import { morganConfig } from './config/morgan.config';
import configCors from './config/cors.config';
import configSwagger from './config/swagger.config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // config environment
  configEnvironment();

  // config cors
  configCors(app);

  // Config http request logger
  app.use(morganConfig());

  // config validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // config global prefix
  app.setGlobalPrefix('api/v1', {
    exclude: ['/api-docs'],
  });

  // config swagger
  configSwagger(app);

  return app;
}

bootstrap().then((app) => {
  app
    .listen(process.env.PORT ?? 3000)
    .then(() => {
      Logger.log(
        `Server is running on port http://localhost:${process.env.PORT ?? 3000}`,
        'Config 🚧',
      );
    })
    .catch((error) => {
      Logger.error(error, 'Server 🚧');
      process.exit(1);
    });
});
