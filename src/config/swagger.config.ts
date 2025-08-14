import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function configSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('My NestJS API')
    .setDescription('API documentation')
    .setVersion('1.0')
    //.addBearerAuth() // if you want to enable JWT auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  Logger.log('Swagger config complete', 'Config 🚧');
  Logger.log('Swagger docs available at /api-docs', 'Config 🚧');
}
