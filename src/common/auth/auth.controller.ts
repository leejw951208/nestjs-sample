import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResDto } from './dto/auth-res.dto';
import { SignupReqDto } from './dto/signup-req.dto';
import { LocalGuard } from '../guard/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseGuards(LocalGuard)
  signin(@Request() req: any): Promise<AuthResDto> {
    return this.authService.siginin(req.user);
  }

  @Post('signup')
  async signup(@Body() signupReqDto: SignupReqDto): Promise<string> {
    return await this.authService.signup(signupReqDto);
  }
}
