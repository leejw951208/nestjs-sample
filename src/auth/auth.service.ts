import { Inject, Injectable } from '@nestjs/common'
import * as bcryptjs from 'bcryptjs'
import { User } from '@prisma/client'
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
import { UserResponseDto } from '../user/dto/user-response.dto'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService
    ) {}

    async join(reqDto: JoinRequestDto): Promise<void> {
        const hashedPassword = await bcryptjs.hash(reqDto.password, 10)
        const createdUser = { ...new UserModel(), ...reqDto, password: hashedPassword }
        await this.prisma.user.create({ data: createdUser })
    }

    async validate(email: string, password: string): Promise<User> {
        const foundUser = await this.prisma.user.findFirst({ where: { email } })
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
        return plainToInstance(LoginResponseDto, {
            accessToken,
            refreshToken,
            userResponseDto
        })
    }

    private async createAccessToken(user: User): Promise<string> {
        const payload = {
            userId: user.id,
            type: 'ac',
            key: 'nsp'
        }

        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRET_KEY'),
            expiresIn: this.configService.get<number>('JWT_ACCESS_EXPIRES_IN')
        })
    }

    private async createRefreshToken(user: User): Promise<string> {
        const payload = {
            userId: user.id,
            type: 're',
            key: 'nsp'
        }

        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRET_KEY'),
            expiresIn: this.configService.get<number>('JWT_REFRESH_EXPIRES_IN')
        })
    }
}
