import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
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
