import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userDto: CreateUserDto): Promise<UserDocument> {
    try {
      const user = await this.userRepository.createUser(userDto);
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException({
          success: false,
          message: 'User already exists',
          field: 'email',
          errorCode: 'USER_ALREADY_EXISTS',
        });
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userRepository.findByEmail(email);

    if (user === null) {
      throw new UnauthorizedException('Email not found!');
    }

    return user;
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user)
      throw new NotFoundException({
        message: `User not found!`,
        cause: `User with id ${id} not found in database`,
      });
    return user;
  }

  async findUserAndDelete(id: string) {
    const user = await this.userRepository.deleteUserById(id);
    if (!user)
      throw new NotFoundException({
        message: `User not found!`,
        cause: `User with id ${id} not found in database`,
      });
    return user;
  }
}
