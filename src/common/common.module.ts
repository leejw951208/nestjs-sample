import { Module } from '@nestjs/common';
import * as winston from 'winston';
import { createConsoleTransport, dailyOptions } from './config/winston.config';
import * as winstonDaily from 'winston-daily-rotate-file';
import { WinstonModule } from 'nest-winston';

const filterOnly = (level: string) => winston.format((info) => (info.level === level ? info : false))();

const configureTransports = (isProd: boolean): winston.transport[] => {
  const transports: winston.transport[] = [createConsoleTransport()];

  if (isProd) {
    ['info', 'warn', 'error'].forEach((level) => {
      transports.push(
        new winstonDaily({
          ...dailyOptions(level),
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(
              ({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`,
            ),
            filterOnly(level),
          ),
        }),
      );
    });
  }

  return transports;
};

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: configureTransports(process.env.NODE_ENV === 'prod'),
    }),
  ],
})
export class CommonModule {}
