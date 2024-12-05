import { utilities } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

const IS_PROD = process.env['NODE_ENV'] === 'prod';
const LOG_DIR = process.cwd() + `/logs`;

export const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: LOG_DIR + `/${level}`,
    filename: `%DATE%.${level}.log`,
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      utilities.format.nestLike(process.env.NODE_ENV, { colors: false, prettyPrint: true }),
    ),
  };
};

export const winstonTransports = [
  new winston.transports.Console({
    level: IS_PROD ? 'info' : 'silly',
    format: IS_PROD
      ? winston.format.simple()
      : winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike('NestJS-Basic', {
            colors: true,
            prettyPrint: true, // nest에서 제공하는 옵션. 로그 가독성을 높여줌
            processId: true,
            appName: true,
          }),
        ),
  }),
  new winstonDaily(dailyOptions('info')),
  new winstonDaily(dailyOptions('error')),
];
