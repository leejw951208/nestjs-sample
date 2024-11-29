import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalGuard } from '../guard/local.guard';
import { LocalStrategy } from '../strategy/local.strategy';

@Module({
  imports: [JwtModule.register({ global: true })],
  controllers: [AuthController],
  providers: [AuthService, LocalGuard, LocalStrategy],
})
export class AuthModule {}
