import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { Logger } from 'winston';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { BaseException } from './base.exception';
import { BAD_REQUEST, IErrorCodes, INTERNAL_SERVER_ERROR, NOT_FOUND, PRISMA } from './error.code';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';

export class GlobalExceptionHandler implements ExceptionFilter {
    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {}

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest();

        if (exception instanceof BaseException) {
            const status = exception.getStatus();
            const errorResponse = exception.getResponse() as IErrorCodes;
            const message = errorResponse.message;
            // 로그 출력
            this.logger.error(`HTTP Exception: ${message}`, {
                statusCode: status,
                errorCode: errorResponse.errorCode,
                message: message,
                timestamp: new Date().toISOString(),
                path: request.url
            });
            // 클라이언트에 응답
            response.status(status).json({
                statusCode: status,
                errorCode: errorResponse.errorCode,
                message: message,
                timestamp: new Date().toISOString(),
                path: request.url
            });
        } else if (exception instanceof NotFoundException) {
            const status = HttpStatus.NOT_FOUND;
            const json = {
                ...NOT_FOUND.GENERAL,
                message: exception.message,
                timestamp: new Date().toISOString(),
                path: request.url
            };
            this.logger.error(`HTTP Exception: ${exception}`, json);
            response.status(status).json(json);
        } else if (exception instanceof PrismaClientKnownRequestError) {
            const code = exception.code as keyof typeof PRISMA;
            const prismaError = PRISMA[code] ?? PRISMA.GENERAL;
            const status = prismaError.statusCode;
            const json = {
                ...prismaError,
                message: prismaError.message,
                timestamp: new Date().toISOString(),
                path: request.url
            };
            // 로그 출력
            this.logger.error(`HTTP Exception: ${exception}`, json);
            // 클라이언트에 응답
            response.status(status).json(json);
        } else if (exception instanceof PrismaClientValidationError) {
            const status = HttpStatus.BAD_REQUEST;
            const json = {
                ...BAD_REQUEST.GENERAL,
                timestamp: new Date().toISOString(),
                path: request.url
            };
            this.logger.error(`HTTP Exception: ${exception}`, json);
            response.status(status).json(json);
        } else {
            const status = HttpStatus.INTERNAL_SERVER_ERROR;
            const json = {
                ...INTERNAL_SERVER_ERROR.GENERAL,
                timestamp: new Date().toISOString(),
                path: request.url
            };
            console.log(exception);
            // 로그 출력
            this.logger.error(`HTTP Exception: ${exception}`, json);
            // 클라이언트에 응답
            response.status(status).json(json);
        }
    }
}
