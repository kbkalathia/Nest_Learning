import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/models/users.model';
import { RegisterUserDto, LoginUserDto } from 'src/dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() createUserPayload: RegisterUserDto) {
    try {
      return this.usersService.registerUser(createUserPayload as User);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('login')
  login(@Body() loginUserPayload: LoginUserDto) {
    try {
      return this.usersService.loginUser(loginUserPayload as User);
    } catch (error) {
      throw new Error(error);
    }
  }
}
