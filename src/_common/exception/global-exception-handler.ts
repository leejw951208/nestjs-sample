import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
    NotFoundException,
    BadRequestException
} from '@nestjs/common'
import { Response } from 'express'
import { Logger } from 'winston'
import { Inject } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { BaseException } from './base.exception'
import { BAD_REQUEST, IErrorCodes, SERVER_ERROR, NOT_FOUND, PRISMA } from './error.code'
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library'

@Catch()
export class GlobalExceptionHandler implements ExceptionFilter {
    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {}

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest()

        // 공통 필드
        const baseResponse = {
            timestamp: new Date().toISOString(),
            path: request.url
        }

        // 1. BaseException (Custom)
        if (exception instanceof BaseException) {
            const status = exception.getStatus()
            const errorResponse = exception.getResponse() as IErrorCodes
            const message = errorResponse.message
            this.logger.error(`HTTP Exception: ${message}`, {
                ...baseResponse,
                status: status,
                errorCode: errorResponse.errorCode,
                message
            })
            response
                .status(status)
                .json({ ...baseResponse, status: status, errorCode: errorResponse.errorCode, message })
            return
        }

        // 2. class-validator BadRequestException
        if (exception instanceof BadRequestException) {
            const status = exception.getStatus()
            // NestJS에서 class-validator 에러일 때 getResponse()는 아래와 같은 형태:
            // { status: 400, message: [...에러배열], error: 'Bad Request' }
            const errorResponse = exception.getResponse() as any
            // 에러 메시지가 배열이면 첫 번째 메시지 또는 전체 전달 (원하는 대로)
            const message = Array.isArray(errorResponse.message)
                ? errorResponse.message.join(', ')
                : errorResponse.message

            this.logger.error(`Validation Error: ${message}`, {
                ...baseResponse,
                status: status,
                error: errorResponse.error
            })
            response.status(status).json({
                ...baseResponse,
                status: status,
                errorCode: BAD_REQUEST.GENERAL.errorCode,
                message
            })
            return
        }

        // 3. NotFoundException
        if (exception instanceof NotFoundException) {
            const status = HttpStatus.NOT_FOUND
            const json = {
                ...baseResponse,
                ...NOT_FOUND.GENERAL,
                message: exception.message
            }
            this.logger.error(`HTTP Exception: ${exception}`, json)
            response.status(status).json(json)
            return
        }

        // 4. PrismaClientKnownRequestError
        if (exception instanceof PrismaClientKnownRequestError) {
            const code = exception.code as keyof typeof PRISMA
            const prismaError = PRISMA[code] ?? PRISMA.GENERAL
            const status = prismaError.status
            const json = {
                ...baseResponse,
                ...prismaError
            }
            this.logger.error(`HTTP Exception: ${exception}`, json)
            response.status(status).json(json)
            return
        }

        // 5. PrismaClientValidationError
        if (exception instanceof PrismaClientValidationError) {
            const status = HttpStatus.BAD_REQUEST
            const json = {
                ...baseResponse,
                ...BAD_REQUEST.GENERAL
            }
            this.logger.error(`HTTP Exception: ${exception}`, json)
            response.status(status).json(json)
            return
        }

        // 6. 기타 예상치 못한 에러
        const status = HttpStatus.INTERNAL_SERVER_ERROR
        const json = {
            ...baseResponse,
            ...SERVER_ERROR.GENERAL
        }
        this.logger.error(`HTTP Exception: ${exception}`, json)
        response.status(status).json(json)
    }
}
