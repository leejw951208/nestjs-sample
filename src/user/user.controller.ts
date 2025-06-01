import { Controller, Get, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common'
import { UserService } from './user.service'
import { UserUpdateDto } from './dto/user-update.dto'
import { User } from '@prisma/client'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Public } from '../_common/decorator/public.decorator'
import { UserResponseDto } from './dto/user-response.dto'

const path = 'user'
@ApiTags(path)
@ApiBearerAuth('JWT-Auth')
@Controller({ path })
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({
        summary: '회원 조회'
    })
    @ApiParam({ name: 'id', type: 'string', example: 1 })
    @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserResponseDto> {
        return await this.userService.findOne(+id)
    }

    @ApiOperation({
        summary: '회원 수정'
    })
    @ApiParam({ name: 'id', type: 'string', example: 1 })
    @ApiBody({ type: UserUpdateDto })
    @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
    @Public()
    @Patch(':id')
    async update(@Param('id') id: string, @Body() UserUpdateDto: UserUpdateDto): Promise<void> {
        await this.userService.update(+id, UserUpdateDto)
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<User> {
        return await this.userService.remove(+id)
    }
}
