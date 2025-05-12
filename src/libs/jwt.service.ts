import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';

dotenv.config({
  path: '.env.local',
});

@Injectable()
export class JwtServiceClass {
  constructor(private readonly jwt: JwtService) {}

  generateToken(payload: any, expiresIn: string = '1d'): string {
    return this.jwt.sign(payload, {
      expiresIn,
      secret: process.env.JWT_SECRET,
    });
  }

  generateRefreshToken(payload: any, expiresIn: string = '7d'): string {
    return this.jwt.sign(payload, {
      expiresIn,
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }

  verifyToken(token: string): any {
    return this.jwt.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }

  verifyRefreshToken(token: string): any {
    return this.jwt.verify(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }
}
