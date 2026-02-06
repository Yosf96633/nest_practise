import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import type { Response } from 'express';
import { HasToken } from './guards/has-auth.guard';
import { LoginUserDto } from 'src/common/dto/login-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(HasToken)
  async register(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.register(userDto);
    const accessToken = await this.authService.generateAccessToken(result.user);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    });
    return { success: true, message: 'User registered', ...result };
  }

  @Post('/login')
  @UseGuards(HasToken)
  async login(
    @Body() userDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(userDto);
    const accessToken = await this.authService.generateAccessToken(result);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    });
    const { password: _ ,__v:v ,  ...userWithoutPassword } = result.toObject();

    return {
      success: true,
      message: 'login successfull',
      data : {
        ...userWithoutPassword,
      }
    };
  }
}
