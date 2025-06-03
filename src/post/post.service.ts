import { Inject, Injectable } from '@nestjs/common'
import { PRISMA_SERVICE } from '../_common/prisma/prisma.module'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { PrismaService } from '../_common/prisma/prisma.service'
import { ClsService } from 'nestjs-cls'
import { NOT_FOUND } from '../_common/exception/error.code'
import { BaseException } from '../_common/exception/base.exception'
import { PostResponseDto } from './dto/post-response.dto'
import { plainToInstance } from 'class-transformer'
import { PostSaveDto } from './dto/post-save.dto'
import { PostModel } from './model/post.model'
import { PostUpdateDto } from './dto/post-update.dto'
import { PostPageableRequestDto } from './dto/post-pageable-request.dto'

@Injectable()
export class PostService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
        @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
        private readonly clsService: ClsService
    ) {}

    async findPage(searchCondition: PostPageableRequestDto): Promise<[PostResponseDto[], number]> {
        const findPosts = await this.prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
            skip: (searchCondition.page - 1) * searchCondition.size,
            take: searchCondition.size
        })

        const totalCount = await this.prisma.post.count({})

        return [plainToInstance(PostResponseDto, findPosts, { excludeExtraneousValues: true }), totalCount]
    }

    async findById(id: number): Promise<PostResponseDto> {
        const findPost = await this.prisma.post.findFirst({ where: { id } })
        if (!findPost) throw new BaseException(NOT_FOUND.GENERAL, this.constructor.name)
        return plainToInstance(PostResponseDto, findPost, { excludeExtraneousValues: true })
    }

    async save(reqDto: PostSaveDto): Promise<void> {
        const userId = this.clsService.get('userId')
        const findUser = await this.prisma.user.findFirst({ where: { id: userId } })
        if (!findUser) throw new BaseException(NOT_FOUND.USER_NOT_FOUND, this.constructor.name)

        const createdPost = PostModel.create(userId, reqDto)
        await this.prisma.post.create({ data: createdPost })
    }

    async update(id: number, reqDto: PostUpdateDto): Promise<void> {
        const userId = this.clsService.get('userId')
        const findUser = await this.prisma.user.findFirst({ where: { id: userId } })
        if (!findUser) throw new BaseException(NOT_FOUND.USER_NOT_FOUND, this.constructor.name)

        const findPost = await this.prisma.post.findFirst({ where: { id } })
        if (!findPost) throw new BaseException(NOT_FOUND.GENERAL, this.constructor.name)
        await this.prisma.post.update({ where: { id }, data: { ...findUser, ...reqDto } })
    }

    async delete(id: number): Promise<void> {
        const userId = this.clsService.get('userId')
        const findUser = await this.prisma.user.findFirst({ where: { id: userId } })
        if (!findUser) throw new BaseException(NOT_FOUND.USER_NOT_FOUND, this.constructor.name)

        const findPost = await this.prisma.post.findFirst({ where: { id } })
        if (!findPost) throw new BaseException(NOT_FOUND.GENERAL, this.constructor.name)
        await this.prisma.post.delete({ where: { id } })
    }
}
