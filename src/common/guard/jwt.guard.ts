import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { BaseException } from '../exception/base.exception';
import { BAD_REQUEST, UNAUTHORIZED } from '../exception/error.code';
import { JsonWebTokenError } from '@nestjs/jwt';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // @Public() 데코레이터가 있는지 확인
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Public 라우트인 경우 인증 검사 건너뛰기
    if (isPublic) {
      return true;
    }

    // JWT Strategy로 토큰 검증을 위임
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info) {
      if (info instanceof JsonWebTokenError) {
        throw new BaseException(UNAUTHORIZED.INVALID_ACCESS_TOKEN, this.constructor.name);
      } else {
        throw new BaseException(BAD_REQUEST.MISSING_ACCESS_TOKEN, this.constructor.name);
      }
    }
    return super.handleRequest(err, user, info, context, status);
  }
}
