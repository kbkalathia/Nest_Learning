import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/models/users.model';
import { RegisterUserDto, LoginUserDto } from 'src/dtos/user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/utils/enums';
import { JwtAuthGuard } from 'src/middleware/guards/auth.guard';
import { RolesGuard } from 'src/middleware/guards/roles.guard';

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

  @Post('refresh-access-token')
  refreshUserAccessToken(@Body('refreshToken') refreshToken:string) {
    try {
      return this.usersService.refreshAccessToken(refreshToken);
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('test')
  test() {
    try {
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
