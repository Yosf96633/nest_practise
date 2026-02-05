import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  @Transform(({ value }) => value?.trim().toLowerCase())
  firstname: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim().toLowerCase())
  lastname?: string;

  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @Transform(({ value }) => value?.trim().toLowerCase())
  username: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @Transform(({ value }) => value?.trim().toLowerCase())
  email: string;

  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'Password must contain at least one uppercase letter and one number',
  })
  password: string;

  @IsOptional()
  @IsEnum(['user', 'admin'], {
    message: 'Role must be either user or admin',
  })
  role?: 'user' | 'admin';
}
