import { Inject, Injectable } from '@nestjs/common'
import * as bcryptjs from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { JoinRequestDto } from './dto/join-request.dto'
import { PrismaService } from '../_common/prisma/prisma.service'
import { UserModel } from '../user/model/user.model'
import { BaseException } from '../_common/exception/base.exception'
import { NOT_FOUND, UNAUTHORIZED } from '../_common/exception/error.code'
import { PRISMA_SERVICE } from '../_common/prisma/prisma.module'
import { plainToInstance } from 'class-transformer'
import { LoginResponseDto } from './dto/login-response.dto'
import { RefreshTokenResponseDto } from './dto/refresh-token-response.dto'
import { UserResponseDto } from '../user/dto/user-response.dto'
import { TokenModel } from './model/token.model'
import { UserStatus } from '@prisma/client'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService
    ) {}

    async join(reqDto: JoinRequestDto): Promise<void> {
        const hashedPassword = await bcryptjs.hash(reqDto.password, 10)
        const createdUser = UserModel.create(reqDto.email, hashedPassword, reqDto.name, UserStatus.ACTIVATED)
        await this.prisma.user.create({ data: createdUser })
    }

    async validate(email: string, password: string): Promise<UserModel> {
        const foundUser = await this.prisma.user.findUnique({ where: { email } })
        if (!foundUser) {
            throw new BaseException(NOT_FOUND.USER_NOT_FOUND, this.constructor.name)
        }
        const isMatched = await bcryptjs.compare(password, foundUser.password)
        if (!isMatched) {
            throw new BaseException(UNAUTHORIZED.PASSWORD_NOT_MATCHED, this.constructor.name)
        }
        return foundUser
    }

    async login(user: UserModel): Promise<LoginResponseDto> {
        const accessToken = await this.createAccessToken(user)
        const refreshToken = await this.createRefreshToken(user)
        const userResponseDto = plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true })

        const createdToken = TokenModel.create(user.id, refreshToken)
        await this.prisma.token.create({ data: createdToken })

        return plainToInstance(LoginResponseDto, {
            accessToken,
            refreshToken,
            userResponseDto
        })
    }

    async refreshToken(refreshToken: string): Promise<RefreshTokenResponseDto> {
        try {
            // 리프레시 토큰 검증
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get<string>('JWT_SECRET_KEY')
            })

            // 리프레시 토큰 타입 확인
            if (payload.type !== 're') {
                throw new BaseException(UNAUTHORIZED.INVALID_REFRESH_TOKEN, this.constructor.name)
            }

            // 사용자 정보 조회
            const user = await this.prisma.user.findUnique({
                where: { id: payload.userId }
            })

            if (!user) {
                throw new BaseException(NOT_FOUND.USER_NOT_FOUND, this.constructor.name)
            }

            // DB에서 리프레시 토큰 조회
            const foundToken = await this.prisma.token.findFirst({
                where: { userId: user.id, refreshToken }
            })
            if (!foundToken) throw new BaseException(UNAUTHORIZED.INVALID_REFRESH_TOKEN, this.constructor.name)

            // 새로운 토큰 생성
            const newAccessToken = await this.createAccessToken(user)
            const newRefreshToken = await this.createRefreshToken(user)

            // 토큰 갱신
            await this.prisma.token.updateMany({ where: { userId: user.id }, data: { refreshToken: newRefreshToken } })

            return plainToInstance(RefreshTokenResponseDto, {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            })
        } catch (error) {
            throw new BaseException(UNAUTHORIZED.INVALID_REFRESH_TOKEN, this.constructor.name)
        }
    }

    private createTokenPayload(user: UserModel, type: 'ac' | 're'): { userId: number; type: string; key: string } {
        return {
            userId: user.id,
            type,
            key: 'nsp'
        }
    }

    private async signToken(payload: any, expiresIn: string): Promise<string> {
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRET_KEY'),
            expiresIn
        })
    }

    private async createAccessToken(user: UserModel): Promise<string> {
        const payload = this.createTokenPayload(user, 'ac')
        return await this.signToken(payload, this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'))
    }

    private async createRefreshToken(user: UserModel): Promise<string> {
        const payload = this.createTokenPayload(user, 're')
        return await this.signToken(payload, this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'))
    }
}
