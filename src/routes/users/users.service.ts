import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from '../../dtos/user-dto/create-user.dto';
import { UpdateUserDto } from '../../dtos/user-dto/update-user.dto';
import { User } from '../../models/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Check if email already exists in the database
    const existingUser = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    return this.userModel.create(createUserDto as User);
  }

  findAll() {
    return this.userModel.findAll();
  }

  async findOne(id: string) {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Check if user exists
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check if email already exists (in case it's being updated)
    if (updateUserDto.email) {
      const emailExist = await this.userModel.findOne({
        where: { email: updateUserDto.email },
      });
      if (emailExist) {
        throw new ConflictException('Email already in use');
      }
    }

    await user.update(updateUserDto);
    return user;
  }

  async remove(id: string) {
    // Check if user exists before attempting to delete
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.userModel.destroy({ where: { id } });
  }
}
