import { utilities, WinstonModule } from 'nest-winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import * as winston from 'winston';

const IS_PROD = process.env['NODE_ENV'] === 'prod';
const LOG_DIR = process.cwd() + '/logs';

const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: LOG_DIR + `/${level}`,
    filename: `%DATE%.${level}.log`,
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  };
};

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: IS_PROD ? 'info' : 'silly',
      // production 환경이라면 info, 개발환경이라면 모든 단계를 로그
      format: IS_PROD
        ? // production 환경은 자원을 아끼기 위해 simple 포맷 사용
          winston.format.simple()
        : winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike('SampleApp', {
              colors: true,
              prettyPrint: true, // nest에서 제공하는 옵션. 로그 가독성을 높여줌
              processId: true,
              appName: true,
            }),
          ),
    }),

    // info, warn, error 로그는 파일로 관리
    new winstonDaily(dailyOptions('info')),
    new winstonDaily(dailyOptions('warn')),
    new winstonDaily(dailyOptions('error')),
  ],
});
