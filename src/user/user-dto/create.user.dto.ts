import { IsEmail, IsString, Min } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
