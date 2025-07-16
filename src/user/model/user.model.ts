import { User, UserStatus } from '@prisma/client'
import { PrismaModel } from '../../_common/prisma/prisma.model'

export class UserModel extends PrismaModel implements User {
    email: string
    password: string
    name: string
    status: UserStatus

    private constructor(email: string, password: string, name: string, status: UserStatus) {
        super()
        this.email = email
        this.password = password
        this.name = name
        this.status = status
    }

    static create(email: string, password: string, name: string, status: UserStatus): UserModel {
        return new UserModel(email, password, name, status)
    }
}
