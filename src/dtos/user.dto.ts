import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from 'src/utils/enums';

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

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
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
