import { Inject, Injectable } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { PrismaService } from '../_common/prisma/prisma.service'
import { PRISMA_SERVICE } from '../_common/prisma/prisma.module'
import { UserUpdateDto } from './dto/user-update.dto'
import { plainToInstance } from 'class-transformer'
import { UserResponseDto } from './dto/user-response.dto'
import { BaseException } from '../_common/exception/base.exception'
import { NOT_FOUND } from '../_common/exception/error.code'
import { ClsService } from 'nestjs-cls'

@Injectable()
export class UserService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
        @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
        private readonly clsService: ClsService
    ) {}

    async findOne(): Promise<UserResponseDto> {
        const id = this.clsService.get('userId')
        const findUser = await this.prisma.user.findFirst({ where: { id } })
        if (!findUser) throw new BaseException(NOT_FOUND.USER_NOT_FOUND, this.constructor.name, 'warn')
        return plainToInstance(UserResponseDto, findUser, {
            excludeExtraneousValues: true
        })
    }

    async update(reqDto: UserUpdateDto): Promise<void> {
        const id = this.clsService.get('userId')
        const findUser = await this.prisma.user.findFirst({ where: { id } })
        if (!findUser) throw new BaseException(NOT_FOUND.USER_NOT_FOUND, this.constructor.name)
        await this.prisma.user.update({
            where: { id },
            data: reqDto
        })
    }

    async delete(): Promise<void> {
        const id = this.clsService.get('userId')
        const findUser = await this.prisma.user.findFirst({ where: { id } })
        if (!findUser) throw new BaseException(NOT_FOUND.USER_NOT_FOUND, this.constructor.name)
        await this.prisma.user.delete({ where: { id } })
    }
}
