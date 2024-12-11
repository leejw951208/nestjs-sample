import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleModule } from './sample/sample.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './common/auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TeamModule } from './team/team.module';
import { WinstonModule } from 'nest-winston';
import { winstonModuleAsyncOptions } from './common/config/winston.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      cache: true,
      load: [],
    }),
    WinstonModule.forRootAsync(winstonModuleAsyncOptions),
    SampleModule,
    UserModule,
    PrismaModule,
    AuthModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
