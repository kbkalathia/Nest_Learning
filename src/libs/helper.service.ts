import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HelperService {
  constructor() {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(
    plainText: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainText, hashedPassword);
  }
}

@Injectable()
export class ResponseHelper {
  static send({
    status = HttpStatus.OK,
    message = '',
    data = null,
  }: {
    status?: number;
    message: string;
    data?: any;
  }) {
    return {
      status,
      message,
      data,
    };
  }
}
