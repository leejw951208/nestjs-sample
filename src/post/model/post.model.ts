import { Post } from '@prisma/client'
import { PrismaModel } from '../../_common/prisma/prisma.model'

export class PostModel extends PrismaModel implements Post {
    userId: number
    title: string
    content: string
}
