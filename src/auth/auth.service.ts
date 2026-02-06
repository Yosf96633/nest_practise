import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/common/dto/login-user.dto';
@Injectable()
export class AuthService {
  private readonly saltRounds = 12;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async isPasswordCorrect(
    userPassword: string,
    enteredPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, userPassword);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
  async generateAccessToken(user: UserDocument): Promise<string> {
    return this.jwtService.sign({
      _id: user._id,
      firstName: user.firstname,
      lastName: user.lastname ?? '',
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  }
  async register(userDto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(userDto.password);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    return { user };
  }
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userService.findUserByEmail(email);
    //const hashedPassword = await this.hashPassword(password);

    console.log("Email and password:"  , email , password)
    console.log("User :" , user)
    //console.log(hashedPassword)
   

    const result = await this.isPasswordCorrect(user.password, password);
   console.log(result)
    if (!result) {
      throw new UnauthorizedException('Invalid email or password!');
    }
    return user;


  }
}
