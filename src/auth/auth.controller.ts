import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginUserDto } from './roles_permissions/dto/login.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LocalGuard } from './guards/local.guard';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Public } from './roles_permissions/decorators/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() _: LoginUserDto, @Req() request: Request) {
    const user = request?.user;
    return this.jwtService.sign(user);
    // return await this.authService.validateUser(loginUserDto);
  }
}
