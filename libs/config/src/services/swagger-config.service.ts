import { Injectable, Logger } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class SwaggerConfigService {
  private readonly logger = new Logger(SwaggerConfigService.name);

  configure(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('My NestJS API')
      .setDescription('API documentation')
      .setVersion('1.0')
      //.addBearerAuth() // if you want to enable JWT auth
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    this.logger.log('Swagger config complete', 'Config 🚧');
    this.logger.log('Swagger docs available at /api-docs', 'Config 🚧');
  }
}
