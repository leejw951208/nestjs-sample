import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      // JWT 토큰 추출 방법 설정
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 토큰 만료 무시 여부
      ignoreExpiration: false,
      // JWT 시크릿 키 설정
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  // JWT 토큰 검증 후 실행되는 메소드
  async validate(payload: any) {
    return { ...payload };
  }
}
