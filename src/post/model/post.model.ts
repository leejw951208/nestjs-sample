import { Post } from '@prisma/client'
import { PrismaModel } from '../../_common/prisma/prisma.model'
import { PostSaveDto } from '../dto/post-save.dto'
import { PostUpdateDto } from '../dto/post-update.dto'

export class PostModel extends PrismaModel implements Post {
    userId: number
    title: string
    content: string

    private constructor(userId: number, title: string, content: string) {
        super()
        Object.assign(this, { userId, title, content })
    }

    static create(userId: number, dto: PostSaveDto): PostModel {
        return new PostModel(userId, dto.title, dto.content)
    }
}
