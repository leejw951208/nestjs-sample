import { Body, Controller, Delete, Get, HttpStatus, Patch } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserResponseDto } from './dto/user-response.dto'
import { UserUpdateDto } from './dto/user-update.dto'
import { UserService } from './user.service'

const path = 'user'
@ApiTags(path)
@ApiBearerAuth('JWT-Auth')
@Controller({ path })
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({
        summary: '내 정보 조회'
    })
    @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
    @Get('me')
    async findOne(): Promise<UserResponseDto> {
        return await this.userService.findOne()
    }

    @ApiOperation({
        summary: '내 정보 수정'
    })
    @ApiBody({ type: UserUpdateDto })
    @ApiResponse({ status: HttpStatus.OK })
    @Patch('me')
    async update(@Body() UserUpdateDto: UserUpdateDto): Promise<void> {
        await this.userService.update(UserUpdateDto)
    }

    @ApiOperation({
        summary: '내 정보 삭제'
    })
    @ApiResponse({ status: HttpStatus.OK })
    @Delete('me')
    async delete(): Promise<void> {
        await this.userService.delete()
    }
}
