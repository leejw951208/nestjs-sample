import { Global, Module } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { ClsService } from 'nestjs-cls';

export const PRISMA_SERVICE = 'PrismaService';

@Global()
@Module({
    providers: [
        {
            provide: PRISMA_SERVICE,
            inject: [ConfigService, ClsService, WINSTON_MODULE_NEST_PROVIDER],
            useFactory: (config: ConfigService, cls: ClsService, logger: Logger) =>
                new PrismaService(config, cls, logger).extensions()
        }
    ],
    exports: [PRISMA_SERVICE]
})
export class PrismaModule {}
