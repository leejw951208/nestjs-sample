import { Inject, Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { ClsService } from 'nestjs-cls'
import { Logger } from 'winston'
import { BaseException } from '../_common/exception/base.exception'
import { NOT_FOUND } from '../_common/exception/error.code'
import { PRISMA_SERVICE } from '../_common/prisma/prisma.module'
import { PrismaService } from '../_common/prisma/prisma.service'
import { PostPageableRequestDto } from './dto/post-pageable-request.dto'
import { PostResponseDto } from './dto/post-response.dto'
import { PostSaveDto } from './dto/post-save.dto'
import { PostUpdateDto } from './dto/post-update.dto'
import { PostModel } from './model/post.model'

@Injectable()
export class PostService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
        @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
        private readonly clsService: ClsService
    ) {}

    async findPage(searchCondition: PostPageableRequestDto): Promise<[PostResponseDto[], number]> {
        const foundPosts = await this.prisma.post.findMany({
            orderBy: { id: 'asc' },
            skip: (searchCondition.page - 1) * searchCondition.size,
            take: searchCondition.size
        })

        const totalCount = await this.prisma.post.count({})
        return [plainToInstance(PostResponseDto, foundPosts, { excludeExtraneousValues: true }), totalCount]
    }

    async findById(id: number): Promise<PostResponseDto> {
        const foundPost = await this.prisma.post.findUnique({ where: { id } })
        if (!foundPost) throw new BaseException(NOT_FOUND.GENERAL, this.constructor.name)
        return plainToInstance(PostResponseDto, foundPost, { excludeExtraneousValues: true })
    }

    async save(reqDto: PostSaveDto): Promise<void> {
        const userId = this.clsService.get('userId')
        const foundUser = await this.prisma.user.findUnique({ where: { id: userId } })
        if (!foundUser) throw new BaseException(NOT_FOUND.USER_NOT_FOUND, this.constructor.name)

        const createdPost = PostModel.create(userId, reqDto.title, reqDto.content)
        await this.prisma.post.create({ data: createdPost })
    }

    async update(id: number, reqDto: PostUpdateDto): Promise<void> {
        const userId = this.clsService.get('userId')
        const foundUser = await this.prisma.user.findUnique({ where: { id: userId } })
        if (!foundUser) throw new BaseException(NOT_FOUND.USER_NOT_FOUND, this.constructor.name)

        const foundPost = await this.prisma.post.findUnique({ where: { id } })
        if (!foundPost) throw new BaseException(NOT_FOUND.GENERAL, this.constructor.name)
        await this.prisma.post.update({ where: { id }, data: { ...foundPost, ...reqDto } })
    }

    async delete(id: number): Promise<void> {
        const userId = this.clsService.get('userId')
        const foundUser = await this.prisma.user.findUnique({ where: { id: userId } })
        if (!foundUser) throw new BaseException(NOT_FOUND.USER_NOT_FOUND, this.constructor.name)

        const foundPost = await this.prisma.post.findUnique({ where: { id } })
        if (!foundPost) throw new BaseException(NOT_FOUND.GENERAL, this.constructor.name)
        await this.prisma.post.delete({ where: { id } })
    }
}
