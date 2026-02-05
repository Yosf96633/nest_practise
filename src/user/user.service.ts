import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { User , UserDocument } from './schemas/user.schema';

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
          success:false,
          message: 'User already exists',
          field: 'email',
          errorCode: 'USER_ALREADY_EXISTS',
        });
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
