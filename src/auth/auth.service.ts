import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {

  }

 async register(userDto: CreateUserDto) {
  const user = await this.userService.createUser(userDto);
   console.log('User in auth.service.ts', user);
  return { user };
}
}
