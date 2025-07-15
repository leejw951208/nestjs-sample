import { ConfigService } from '@nestjs/config'
import { utilities, WinstonModule, WinstonModuleAsyncOptions, WinstonModuleOptions } from 'nest-winston'
import * as winston from 'winston'
import * as winstonDaily from 'winston-daily-rotate-file'
import { ConsoleTransportOptions } from 'winston/lib/winston/transports'

export const dailyOptions = (level: string, logDir: string) => {
    return {
        level,
        datePattern: 'YYYY-MM-DD',
        dirname: `${logDir}/${level}`,
        filename: `%DATE%.log`,
        zippedArchive: true,
        maxSize: '10m',
        maxFiles: '14d',
        format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike('NestJS-Sample', {
                colors: false,
                prettyPrint: true,
                appName: true
            })
        )
    }
}

export const winstonModuleAsyncOptions: WinstonModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('NODE_ENV')
        const isProd = nodeEnv === 'prod'
        const logDir = configService.get<string>('LOG_DIR') || `logs`
        const logLevel = isProd ? 'info' : 'debug'

        const consoleOptions: ConsoleTransportOptions = {
            format: isProd
                ? winston.format.simple()
                : winston.format.combine(
                      winston.format.timestamp(),
                      utilities.format.nestLike('NestJS-Sample', {
                          colors: true,
                          prettyPrint: true,
                          appName: true
                      })
                  )
        }

        return {
            level: logLevel,
            transports: [
                new winston.transports.Console(consoleOptions),
                new winstonDaily(dailyOptions('error', logDir)),
                new winstonDaily({
                    ...dailyOptions('app', logDir),
                    level: logLevel,
                    format: winston.format.combine(
                        winston.format((info) => {
                            if (info.level === 'error') {
                                return false
                            }
                            return info
                        })(),
                        winston.format.timestamp(),
                        utilities.format.nestLike('NestJS-Sample', {
                            colors: false,
                            prettyPrint: true,
                            appName: true
                        })
                    )
                })
            ]
        }
    }
}
