import {
  Body,
  Controller,
  Get,
  Ip,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { UsersService } from './users.service';
type IUser = {
  id: number;
  name: string;
  gender: 'M' | 'F';
  age: number;
};

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUser() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findUserId(@Param('id') id) {
    return this.usersService.findById(Number(id));
  }

  @Post()
  addUser(@Body() body: IUser) {
    return this.usersService.addUser(body);
  }
}
