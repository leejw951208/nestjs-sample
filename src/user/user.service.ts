import { Inject, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { PrismaService } from '../_common/prisma/prisma.service'
import { PRISMA_SERVICE } from '../_common/prisma/prisma.module'
import { UserUpdateDto } from './dto/user-update.dto'
import { plainToInstance } from 'class-transformer'
import { UserResponseDto } from './dto/user-response.dto'
import { BaseException } from '../_common/exception/base.exception'
import { NOT_FOUND } from '../_common/exception/error.code'

@Injectable()
export class UserService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
        @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService
    ) {}

    async findOne(id: number): Promise<UserResponseDto> {
        const findUser = await this.prisma.user.findUnique({ where: { id } })
        if (!findUser) throw new BaseException(NOT_FOUND.USER_NOT_FOUND, this.constructor.name)

        return plainToInstance(UserResponseDto, findUser, {
            excludeExtraneousValues: true
        })
    }

    async update(id: number, reqDto: UserUpdateDto): Promise<void> {
        const findUser = await this.prisma.user.findUnique({ where: { id } })
        if (!findUser) throw new BaseException(NOT_FOUND.USER_NOT_FOUND, this.constructor.name)

        await this.prisma.user.update({
            where: { id: findUser.id },
            data: reqDto
        })
    }

    async remove(id: number): Promise<User> {
        const user = await this.prisma.user.findUniqueOrThrow({ where: { id } })
        return await this.prisma.user.delete({ where: { id: user.id } })
    }
}
