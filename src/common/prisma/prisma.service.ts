import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { create, filterSoftDeleted, softDelete, update } from './prisma.extenstion';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel> implements OnModuleInit {
    constructor(
        private readonly configService: ConfigService,
        private readonly clsService: ClsService,
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
        return this.$extends(filterSoftDeleted)
            .$extends(create(this.clsService))
            .$extends(update(this.clsService))
            .$extends(softDelete(this.clsService));
    }
}
