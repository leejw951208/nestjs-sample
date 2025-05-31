// src/common/decorators/user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserModel } from '../../user/model/user.model'

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): UserModel => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
})
