import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/common/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    const result = await this.authService.register(userDto);
    console.log('Result in auth.controller.ts', result);
    return { success: true, message: 'User registered', ...result };
  }
}
