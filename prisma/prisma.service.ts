import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel> implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor(private configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get<string>('DATABASE_URL'),
        },
      },
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
        {
          emit: 'event',
          level: 'error',
        },
      ],
    });
  }
  async onModuleInit() {
    await this.$connect();

    this.$on('query', ({ query, params }) => {
      this.logger.log(`${query}; ${params}`);
    });
    this.$on('info', ({ message }) => {
      this.logger.verbose(message);
    });
    this.$on('warn', ({ message }) => {
      this.logger.warn(message);
    });
    this.$on('error', ({ message }) => {
      this.logger.error(message);
    });
  }
}
