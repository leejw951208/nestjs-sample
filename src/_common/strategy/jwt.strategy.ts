import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET_KEY')
        })
    }

    async validate(payload: any) {
        console.log('[JwtStrategy.validate] 호출됨') // <-- 이 로그가 찍혀야 전략이 정상 등록된 것
        return { userId: payload.sub, email: payload.email }
    }
}
