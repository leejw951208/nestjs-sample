import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResDto } from './dto/auth-res.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  create(@Request() req: any): Promise<AuthResDto> {
    return this.authService.siginin(req.user);
  }
}
