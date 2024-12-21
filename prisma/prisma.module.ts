import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ConfigService } from '@nestjs/config';

export const PRISMA_INJECTION_TOKEN = 'PrismaService';

@Global()
@Module({
  providers: [
    {
      provide: PRISMA_INJECTION_TOKEN,
      inject: [ConfigService, WINSTON_MODULE_NEST_PROVIDER],
      useFactory: (config: ConfigService, logger: Logger) => new PrismaService(config, logger).withExtensions(),
    },
  ],
  exports: [PRISMA_INJECTION_TOKEN],
})
export class PrismaModule {}
