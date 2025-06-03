import { Controller, Get, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { UserUpdateDto } from './dto/user-update.dto'
import { User } from '@prisma/client'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Public } from '../_common/decorator/public.decorator'
import { UserResponseDto } from './dto/user-response.dto'
import { ClsService } from 'nestjs-cls'
import { JwtGuard } from '../_common/guard/jwt.guard'

const path = 'user'
@ApiTags(path)
@ApiBearerAuth('JWT-Auth')
@Controller({ path })
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({
        summary: '조회'
    })
    @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
    @Get('me')
    async findOne(): Promise<UserResponseDto> {
        return await this.userService.findOne()
    }

    @ApiOperation({
        summary: '수정'
    })
    @ApiBody({ type: UserUpdateDto })
    @ApiResponse({ status: HttpStatus.OK })
    @Patch('me')
    async update(@Body() UserUpdateDto: UserUpdateDto): Promise<void> {
        await this.userService.update(UserUpdateDto)
    }

    @ApiOperation({
        summary: '삭제'
    })
    @ApiResponse({ status: HttpStatus.OK })
    @Delete('me')
    async delete(): Promise<void> {
        await this.userService.delete()
    }
}
