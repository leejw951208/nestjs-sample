import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleModule } from './sample/sample.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      cache: true,
      load: [],
    }),
    SampleModule,
    CommonModule,
    UserModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
