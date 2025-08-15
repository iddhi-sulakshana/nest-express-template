import { Injectable, Logger, ValidationPipe } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';

@Injectable()
export class ValidationConfigService {
  private readonly logger = new Logger(ValidationConfigService.name);

  configure(app: INestApplication): void {
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    this.logger.log('Global validation pipe configured', 'Config 🚧');
  }
}
