import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  private readonly saltRounds = 12;
  constructor(private readonly userService: UserService) {}
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
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
