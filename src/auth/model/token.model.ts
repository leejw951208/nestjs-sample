import { Token } from '@prisma/client'
import { PrismaModel } from '../../_common/prisma/prisma.model'

export class TokenModel extends PrismaModel implements Token {
    userId: number
    refreshToken: string

    private constructor(userId: number, refreshToken: string) {
        super()
        this.userId = userId
        this.refreshToken = refreshToken
    }

    static create(userId: number, refreshToken: string): TokenModel {
        return new TokenModel(userId, refreshToken)
    }
}
