import { User, UserStatus } from '@prisma/client'
import { PrismaModel } from '../../_common/prisma/prisma.model'

export class UserModel extends PrismaModel implements User {
    email: string
    password: string
    name: string
    status: UserStatus
}
