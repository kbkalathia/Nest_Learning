import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../models/users.model';
import { HelperService, ResponseHelper } from 'src/libs/helper.service';
import { LoginUserDto } from 'src/dtos/user.dto';
import { JwtServiceClass } from 'src/libs/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private helperService: HelperService,
    private jwtService: JwtServiceClass,
  ) {}

  async registerUser(createUserPayload: User) {
    // Check if email already exists in the database
    const existingUser = await this.emailExist(createUserPayload.email);

    // Email Already Exist Conflict
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Encrypt Password
    const hashedPassword = await this.helperService.hashPassword(
      createUserPayload.password,
    );

    // Set in payload
    createUserPayload.password = hashedPassword;

    const newUserData = await this.userModel.create(createUserPayload);
    const { username, email } = newUserData.toJSON();

    return ResponseHelper.send({
      status: HttpStatus.CREATED,
      message: 'Registeration Successfull',
      data: { username, email },
    });
  }

  async loginUser(loginUserPayload: LoginUserDto) {
    // Check if email already exists in the database
    let existingUser = await this.emailExist(loginUserPayload.email);

    // In Case of email not exist
    if (!existingUser) {
      throw new NotFoundException("Email doesn't exist");
    }

    const {
      id: user_id,
      username,
      email,
      password,
      role,
    } = existingUser.toJSON();

    // Compare Password
    const isPasswordMatched = await this.helperService.comparePassword(
      loginUserPayload.password,
      password,
    );

    // If Password Doesn't match
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    // Generate JWT Token
    const payload = {
      id: existingUser.id,
      email,
      username,
      role,
    };

    const accessToken = this.jwtService.generateToken(payload);
    const refreshToken = this.jwtService.generateRefreshToken(payload);

    // store user refresh token
    await this.userModel.update(
      {
        refreshToken,
      },
      {
        where: {
          id: user_id,
        },
      },
    );

    // Return Response
    return ResponseHelper.send({
      message: 'Login successful',
      data: {
        accessToken,
        refreshToken,
        user: { username, email, role },
      },
    });
  }

  async emailExist(email: string) {
    const existingUser = await this.userModel.findOne({
      where: { email },
    });

    return existingUser;
  }

  async refreshAccessToken(refreshToken: string) {
    // Verify Refresh Token
    const isValidRefreshToken =
      this.jwtService.verifyRefreshToken(refreshToken);

      
  }
}
