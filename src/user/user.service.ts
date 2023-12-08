import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/auth.dto';

import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private salt = 10;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(data: RegisterDto) {
    const ifUserExist = await this.userRepository.findOne({
      where: {
        email: data.email.trim(),
      },
    });

    if (ifUserExist) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.userRepository.save({
      email: data.email.trim(),
      password: await this.getHash(data.password),
    });
  }

  async updateUser(userId: string, data: UpdateUserDto): Promise<User> {
    const currentUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (data?.email) {
      if (data.email === currentUser.email) {
        throw new HttpException(
          'This email is the same as yours now.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const duplicateEmail = await this.userRepository.findOne({
        where: { email: data.email },
      });

      if (duplicateEmail) {
        throw new HttpException(
          'User with this email already exists',
          HttpStatus.FORBIDDEN,
        );
      }
    }

    await this.userRepository.update(
      {
        id: userId,
      },
      {
        email: data.email ? data.email.trim() : currentUser.email,
        password: data.password
          ? await this.getHash(data.password)
          : currentUser.password,
      },
    );

    return await this.userRepository.findOne({
      where: { id: userId },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: email.trim() },
    });
  }

  async getUserById(userId: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: userId },
    });
  }

  async deleteUserById(userId: string) {
    await this.userRepository.delete({ id: userId });
    return { message: 'User was deleted' };
  }

  async getHash(password: string | undefined): Promise<string> {
    return bcrypt.hash(password, this.salt);
  }

  async compareHash(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<boolean> {
    const result = await bcrypt.compare(password, hash);

    if (!result) {
      throw new HttpException(
        'User not found or email is incorrect',
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }
}
