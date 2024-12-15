import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResDto } from './dto/auth-res.dto';
import { SignupReqDto } from './dto/signup-req.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  signin(@Request() req: any): Promise<AuthResDto> {
    return this.authService.siginin(req.user);
  }

  @Post('signup')
  async signup(@Body() signupReqDto: SignupReqDto): Promise<string> {
    return await this.authService.signup(signupReqDto);
  }
}
