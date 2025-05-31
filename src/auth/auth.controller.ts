import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginRequestDto } from './dto/login-request.dto'
import { JoinRequestDto } from './dto/join-request.dto'
import { AuthGuard } from '@nestjs/passport'
import { Public } from '../_common/decorator/public.decorator'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CurrentUser } from '../_common/decorator/user.decorator'
import { UserModel } from '../user/model/user.model'
import { LoginResponseDto } from './dto/login-response.dto'

const path = 'auth'
@ApiTags(path)
@ApiBearerAuth('JWT-Auth')
@Controller({ path })
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({
        summary: '로그인'
    })
    @ApiBody({ type: JoinRequestDto })
    @ApiResponse({ status: 201 })
    @Public()
    @Post('join')
    async join(@Body() reqDto: JoinRequestDto): Promise<void> {
        await this.authService.join(reqDto)
    }

    @ApiOperation({
        summary: '로그인'
    })
    @ApiBody({ type: LoginRequestDto })
    @ApiResponse({ status: 200, type: LoginResponseDto })
    @Public()
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@CurrentUser() user: UserModel): Promise<LoginRequestDto> {
        return await this.authService.login(user)
    }
}
