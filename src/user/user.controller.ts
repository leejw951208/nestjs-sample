import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common'
import { UserService } from './user.service'
import { UserUpdateDto } from './dto/user-update.dto'
import { User } from '@prisma/client'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

const path = 'user'
@ApiTags(path)
@ApiBearerAuth('JWT-Auth')
@Controller({ path })
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    async findById(@Param('id') id: string): Promise<User> {
        return await this.userService.findById(+id)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() UserUpdateDto: UserUpdateDto): Promise<User> {
        return await this.userService.update(+id, UserUpdateDto)
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<User> {
        return await this.userService.remove(+id)
    }
}
