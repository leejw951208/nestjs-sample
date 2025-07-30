import { Post, PostStatus } from '@prisma/client'
import { PrismaModel } from '../../_common/prisma/prisma.model'

export class PostModel extends PrismaModel implements Post {
    userId: number
    title: string
    content: string
    status: PostStatus

    private constructor(userId: number, title: string, content: string, status?: PostStatus) {
        super()
        this.userId = userId
        this.title = title
        this.content = content
        this.status = status
    }

    static create(userId: number, title: string, content: string, status?: PostStatus): PostModel {
        return new PostModel(userId, title, content, status)
    }
}
