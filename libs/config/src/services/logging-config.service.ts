import { Injectable, Logger } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import { format } from 'date-fns';
import morgan from 'morgan';

@Injectable()
export class LoggingConfigService {
  private readonly logger = new Logger(LoggingConfigService.name);
  private readonly httpLogger = new Logger('REQUEST 🚀');
  private accessLogStream!: fs.WriteStream;
  private logDir!: string;

  constructor() {
    this.initializeLogging();
    this.setupMorganTokens();
  }

  private initializeLogging(): void {
    this.logDir = path.join(__dirname, '../../logs');
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
    this.accessLogStream = fs.createWriteStream(path.join(this.logDir, 'access.log'), {
      flags: 'a',
    });
    this.logger.log(`Log directory created: ${this.logDir}`, 'Config 🚧');
  }

  private setupMorganTokens(): void {
    morgan.token('time', () => {
      return format(new Date(), 'yyyy-MM-dd:HH.mm.ss.SSS'); // 2025-08-12:10.00.00.000
    });

    morgan.token('short-agent', (req) => {
      const ua = req.headers['user-agent'] || '';
      if (ua.includes('Chrome')) return 'Chrome';
      if (ua.includes('Firefox')) return 'Firefox';
      if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
      if (ua.includes('Edge')) return 'Edge';
      return 'Unknown';
    });
  }

  private getHttpLoggerStream() {
    return {
      write: (message: string) => {
        try {
          const details = JSON.parse(message);
          const detailedMessage = `[${details.time}] : ${details.method} ${details.status} ${details.url} ${details.content_length} - ${details.response_time} | ${details.remote_addr} ${details.user_agent}`;

          // Write to file
          this.accessLogStream.write(message);

          // Log to console
          this.httpLogger.log(detailedMessage);
        } catch (error) {
          this.logger.error('Failed to write log message', error);
        }
      },
    };
  }

  configure(app: INestApplication): void {
    const morganMiddleware = morgan(
      (tokens, req, res) => {
        return JSON.stringify({
          time: tokens['time'](req, res),
          method: tokens.method(req, res),
          url: tokens.url(req, res),
          status: tokens.status(req, res),
          response_time: tokens['response-time'](req, res) + ' ms',
          content_length: tokens.res(req, res, 'content-length'),
          remote_addr: tokens['remote-addr'](req, res),
          user_agent: tokens['short-agent'](req, res),
        });
      },
      { stream: this.getHttpLoggerStream() },
    );

    app.use(morganMiddleware);
    this.logger.log('HTTP request logging configured', 'Config 🚧');
  }

  onModuleDestroy() {
    if (this.accessLogStream) {
      this.accessLogStream.end();
    }
  }
}
