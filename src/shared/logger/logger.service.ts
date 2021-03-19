import { Injectable, Logger } from '@nestjs/common';
import Winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import Sentry from 'winston-transport-sentry-node';

@Injectable()
export default class LoggerService extends Logger {
  private readonly wLogger: Winston.Logger;

  constructor() {
    super(LoggerService.name, true);
    this.wLogger = Winston.createLogger({
      transports: [
        new DailyRotateFile({
          level: 'info',
          filename: `./logs/${process.env.NODE_ENV}/info-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: Winston.format.combine(Winston.format.timestamp(), Winston.format.json()),
        }),
        new Sentry({
          level: 'warn',
          sentry: {
            dsn: 'https://f40ca4dcc2b14567956e9f9bdcc2f3aa@o541644.ingest.sentry.io/5660807',
          },
        }),
        new Sentry({
          level: 'error',
          sentry: {
            dsn: 'https://f40ca4dcc2b14567956e9f9bdcc2f3aa@o541644.ingest.sentry.io/5660807',
          },
        }),
        new Winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          format: Winston.format.combine(
            Winston.format.colorize(),
            Winston.format.timestamp({
              format: 'DD-MM-YYYY HH:mm:ss',
            }),
            Winston.format.simple(),
          ),
        }),
      ],
      exitOnError: false,
    });

    if (process.env.NODE_ENV !== 'production') {
      this.wLogger.debug('Logging initialized at debug level');
    }
  }

  log(message: string): void {
    this.wLogger.info(message);
  }

  info(message: string, context?: string): void {
    this.wLogger.info(message, context);
  }

  debug(message: string): void {
    this.wLogger.debug(message);
  }

  error(message: string, trace?: any, context?: string): void {
    this.wLogger.error(`${context || ''} ${message} -> (${trace || 'trace not provided !'})`, {
      tags: { type: trace },
    });
  }

  warn(message: string): void {
    this.wLogger.warn(message);
  }
}
