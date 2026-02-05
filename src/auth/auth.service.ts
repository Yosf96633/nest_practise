import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  private readonly saltRounds = 12;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
  async generateAccessToken(user: UserDocument): Promise<string> {
    return this.jwtService.sign(
      {
        _id: user._id,
        firstName: user.firstname,
        lastName: user.lastname ?? '',
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    );
  }
  async register(userDto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(userDto.password);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    return { user };
  }
}
