import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Must be valid email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Must be valid email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
