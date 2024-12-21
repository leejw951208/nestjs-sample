import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthResDto } from './dto/auth-res.dto';
import { SignupReqDto } from './dto/signup-req.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UserModel } from '../user/model/user.model';
import { BaseException } from '../common/exception/base.exception';
import { NOT_FOUND, UNAUTHORIZED } from '../common/exception/error.code';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new BaseException(NOT_FOUND.GENERAL, this.constructor.name);
    }
    const isMatched = await bcryptjs.compare(password, user.password);
    if (!isMatched) {
      throw new BaseException(UNAUTHORIZED.PASSWORD_NOT_MATCHED, this.constructor.name);
    }
    return user;
  }

  async siginin(user: User): Promise<AuthResDto> {
    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);
    return AuthResDto.create(accessToken, refreshToken, user);
  }

  async signup(reqDto: SignupReqDto): Promise<string> {
    const hashedPassword = await bcryptjs.hash(reqDto.password, 10);
    const userModel = UserModel.create(Object.assign(reqDto, { password: hashedPassword }));
    await this.prisma.user.create({ data: userModel });
    return 'succeed!';
  }

  private async createAccessToken(user: User): Promise<string> {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      type: 'ac',
    };

    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
      expiresIn: this.configService.get<number>('JWT_ACCESS_EXPIRES_IN'),
    });
  }

  private async createRefreshToken(user: User): Promise<string> {
    const payload = {
      id: user.id,
      type: 're',
    };

    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
      expiresIn: this.configService.get<number>('JWT_REFRESH_EXPIRES_IN'),
    });
  }
}
