import {
    Controller,
    Post,
    Body,
    Request,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
    HttpStatus
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginRequestDto } from './dto/login-request.dto'
import { JoinRequestDto } from './dto/join-request.dto'
import { RefreshTokenRequestDto } from './dto/refresh-token-request.dto'
import { RefreshTokenResponseDto } from './dto/refresh-token-response.dto'
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
        summary: '회원가입'
    })
    @ApiBody({ type: JoinRequestDto })
    @ApiResponse({ status: HttpStatus.CREATED })
    @Public()
    @Post('join')
    async join(@Body() reqDto: JoinRequestDto): Promise<void> {
        await this.authService.join(reqDto)
    }

    @ApiOperation({
        summary: '로그인'
    })
    @ApiBody({ type: LoginRequestDto })
    @ApiResponse({ status: HttpStatus.OK, type: LoginResponseDto })
    @Public()
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@CurrentUser() user: UserModel): Promise<LoginResponseDto> {
        return await this.authService.login(user)
    }

    @ApiOperation({
        summary: '토큰 재발급'
    })
    @ApiBody({ type: RefreshTokenRequestDto })
    @ApiResponse({ status: HttpStatus.OK, type: RefreshTokenResponseDto })
    @Public()
    @Post('refresh')
    async refreshToken(@Body() reqDto: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto> {
        return await this.authService.refreshToken(reqDto.refreshToken)
    }
}
