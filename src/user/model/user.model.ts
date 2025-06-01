import { Exclude } from 'class-transformer'
import { PrismaModel } from '../../_common/prisma/prisma.model'
import { JoinRequestDto } from '../../auth/dto/join-request.dto'
import { User, UserStatus } from '@prisma/client'

export class UserModel extends PrismaModel implements User {
    email: string
    password: string
    name: string
    status: UserStatus

    private constructor(email: string, password: string, name: string) {
        super()
        Object.assign(this, { email, password, name })
    }

    static create(dto: JoinRequestDto): UserModel {
        return new UserModel(dto.email, dto.password, dto.name)
    }
}
