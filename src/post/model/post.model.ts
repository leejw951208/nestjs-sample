import { Post } from '@prisma/client'
import { PrismaModel } from '../../_common/prisma/prisma.model'

export class PostModel extends PrismaModel implements Post {
    userId: number
    title: string
    content: string

    private constructor(userId: number, title: string, content: string) {
        super()
        this.userId = userId
        this.title = title
        this.content = content
    }

    static create(userId: number, title: string, content: string): PostModel {
        return new PostModel(userId, title, content)
    }
}
