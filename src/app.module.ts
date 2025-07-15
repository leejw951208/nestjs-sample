import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { WinstonModule } from 'nest-winston'
import { ClsModule } from 'nestjs-cls'
import { winstonModuleAsyncOptions } from './_common/config/winston.config'
import { JwtGuard } from './_common/guard/jwt.guard'
import { CustomClsMiddleware } from './_common/middleware/cls.middleware'
import { LoggerMiddleware } from './_common/middleware/logger.middleware'
import { PrismaModule } from './_common/prisma/prisma.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PostModule } from './post/post.module'
import { UserModule } from './user/user.module'

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
            .forRoutes({ path: '*splat', method: RequestMethod.ALL })
            .apply(CustomClsMiddleware)
            .forRoutes({ path: '*splat', method: RequestMethod.ALL })
    }
}
