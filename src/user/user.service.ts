import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, MongooseError } from 'mongoose';
import { CreateUserDTO } from './user-dto/create.user.dto';
import bcrypt from 'bcrypt';
import { MongoServerError } from 'mongodb';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userRepositry: Model<User>,
  ) {}

  // Create the user
  async createUser(user: CreateUserDTO) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const createdUser = await this.userRepositry.create({
        username: user.username,
        email: user.email,
        password: hashedPassword,
      });
      if (!createdUser) {
        throw new BadRequestException('User not created!');
      }
      return {
        sucess: true,
        data: {
          _id: createdUser._id,
          username: createdUser.username,
          email: createdUser.email,
        },
      };
    } catch (error: unknown) {
      if (error instanceof MongoServerError && error.code === 11000) {
        console.log(error);
        throw new BadRequestException('User already exist!');
      }
    }
  }
}
