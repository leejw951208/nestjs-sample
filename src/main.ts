import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { GlobalExceptionHandler } from './_common/exception/global-exception-handler'
import { setupSwagger } from './_common/config/swagger.config'
import { ConfigService } from '@nestjs/config'
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)

    const logger = app.get(WINSTON_MODULE_NEST_PROVIDER)
    app.useLogger(logger)
    app.useGlobalFilters(new GlobalExceptionHandler(logger))

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    app.useGlobalPipes(
        new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, forbidUnknownValues: true })
    )

    // API 전역 설정
    app.setGlobalPrefix(configService.get<string>('API_PREFIX'))
    app.enableVersioning({
        type: VersioningType.URI,
        prefix: configService.get<string>('API_VERSIONING').split('')[0],
        defaultVersion: configService.get<string>('API_VERSIONING').split('')[1]
    })

    setupSwagger(app)

    await app.listen(configService.get<number>('PORT') ?? 3000)
}
bootstrap()
