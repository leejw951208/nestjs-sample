import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

const path = 'health-check';
@ApiTags(path)
@ApiBearerAuth('JWT-Auth')
@Controller({ path })
export class AppController {
    constructor(private readonly service: AppService) {}

    @ApiOperation({ summary: 'Health Check' })
    @ApiResponse({ status: 200 })
    @Get()
    healthCheck(@Res() res: Response) {
        res.status(HttpStatus.OK).json();
    }
}
