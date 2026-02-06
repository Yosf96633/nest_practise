import { IsEmail, IsString, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginUserDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsString()
  password: string;
}
