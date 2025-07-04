import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { PrismaModule } from './_common/prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import { LoggerMiddleware } from './_common/middleware/logger.middleware'
import { WinstonModule } from 'nest-winston'
import { winstonModuleAsyncOptions } from './_common/config/winston.config'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtGuard } from './_common/guard/jwt.guard'
import { ClsModule } from 'nestjs-cls'
import { CustomClsMiddleware } from './_common/middleware/cls.middleware'
import { PostModule } from './post/post.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `./envs/.env.${process.env.NODE_ENV}`,
            isGlobal: true,
            cache: true,
            load: []
        }),
        ClsModule.forRoot({
            global: true,
            middleware: { mount: false }
        }),
        PrismaModule,
        WinstonModule.forRootAsync(winstonModuleAsyncOptions),
        UserModule,
        AuthModule,
        PostModule
    ],
    controllers: [AppController],
    providers: [AppService, { provide: APP_GUARD, useClass: JwtGuard }]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL })
            .apply(CustomClsMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL })
    }
}
