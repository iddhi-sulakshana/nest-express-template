import { Injectable, Logger } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';

@Injectable()
export class CorsConfigService {
  private readonly logger = new Logger(CorsConfigService.name);

  configure(app: INestApplication): void {
    app.enableCors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    this.logger.log('CORS configuration completed', 'Config 🚧');
  }
}
