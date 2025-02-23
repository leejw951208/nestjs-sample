import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { filterSoftDeleted, softDelete, update } from './prisma.extenstion';

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel> implements OnModuleInit {
    constructor(
        private readonly configService: ConfigService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger
    ) {
        super({
            datasources: {
                db: {
                    url: configService.get<string>('DATABASE_URL')
                }
            },
            log: [
                {
                    emit: 'event',
                    level: 'query'
                }
            ]
            
        });
        this.$on('query', ({ query, params }) => {
            this.logger.debug(`${query}: ${params}`);
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    extensions() {
        return this.$extends(filterSoftDeleted).$extends(softDelete).$extends(update);
    }
}
