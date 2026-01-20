import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './user-dto/create.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Post()
  createUser(@Body() user: CreateUserDTO) {
     return this.userServices.createUser(user)
  }
}
