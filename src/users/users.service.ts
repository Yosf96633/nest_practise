import { Body, Injectable, NotFoundException } from '@nestjs/common';

type IUser = {
  id: number;
  name: string;
  gender: 'M' | 'F';
  age: number;
};
@Injectable()
export class UsersService {
  private users: IUser[] = [
    {
      id: 1,
      name: 'Yousaf',
      age: 22,
      gender: 'M',
    },
    {
      id: 2,
      name: 'Sarah',
      age: 25,
      gender: 'F',
    },
    {
      id: 3,
      name: 'Bilal',
      age: 23,
      gender: 'M',
    },
    {
      id: 4,
      name: 'Ali',
      age: 26,
      gender: 'M',
    },
  ];

  findAll() {
    return {
      sucess: true,
      users: this.users,
    };
  }

  findById(id: number): IUser {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`user not found`);
    }
    return user;
  }

  addUser(@Body() body: IUser) {
    this.users.push(body);
    return `User added`;
  }
}
