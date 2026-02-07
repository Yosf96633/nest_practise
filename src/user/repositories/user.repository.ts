import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(userDto: Partial<User>): Promise<UserDocument> {
    try {
      const user = new this.userModel(userDto);
      return await user.save();
    } catch (error) {
      throw error;
    }
  }
  async findByEmail(email: string): Promise<UserDocument | null> {
    try {
      const user = await this.userModel.findOne({ email: email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<UserDocument | null> {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUserById(id: string) {
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
