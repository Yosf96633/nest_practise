import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(userDto: Partial<User>): Promise<User> {
    try {
      const user = new this.userModel(userDto);
       console.log('User in user.repository.ts', user);
      return await user.save();
    } catch (error) {
       console.log('error in user.repository.ts', error);
      throw error; 
    }
  }
}
