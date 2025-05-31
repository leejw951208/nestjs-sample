import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import * as bcryptjs from 'bcryptjs'
import { User } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { LoginRequestDto } from './dto/login-request.dto'
import { JoinRequestDto } from './dto/join-request.dto'
import { PrismaService } from '../_common/prisma/prisma.service'
import { UserModel } from '../user/model/user.model'
import { BaseException } from '../_common/exception/base.exception'
import { NOT_FOUND, UNAUTHORIZED } from '../_common/exception/error.code'
import { PRISMA_SERVICE } from '../_common/prisma/prisma.module'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService
    ) {}

    async join(reqDto: JoinRequestDto): Promise<void> {
        const hashedPassword = await bcryptjs.hash(reqDto.password, 10)
        const userModel = UserModel.create(Object.assign(reqDto, { password: hashedPassword }))
        await this.prisma.user.create({ data: userModel })
    }

    async validate(email: string, password: string): Promise<User> {
        const user = await this.prisma.user.findUniqueOrThrow({ where: { email } })
        const isMatched = await bcryptjs.compare(password, user.password)
        if (!isMatched) {
            throw new BaseException(UNAUTHORIZED.PASSWORD_NOT_MATCHED, this.constructor.name)
        }
        return user
    }

    async login(user: UserModel): Promise<LoginRequestDto> {
        const accessToken = await this.createAccessToken(user)
        const refreshToken = await this.createRefreshToken(user)
        return plainToInstance(LoginRequestDto, {
            accessToken,
            refreshToken,
            id: user.id,
            email: user.email,
            name: user.name
        })
    }

    private async createAccessToken(user: User): Promise<string> {
        const payload = {
            id: user.id,
            type: 'ac'
        }

        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRET_KEY'),
            expiresIn: this.configService.get<number>('JWT_ACCESS_EXPIRES_IN')
        })
    }

    private async createRefreshToken(user: User): Promise<string> {
        const payload = {
            id: user.id,
            type: 're'
        }

        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRET_KEY'),
            expiresIn: this.configService.get<number>('JWT_REFRESH_EXPIRES_IN')
        })
    }
}
