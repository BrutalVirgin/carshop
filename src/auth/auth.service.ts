import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.userService.getUserByEmail(loginDto.email);

    if (!user) {
      throw new HttpException(
        'User not found or email is incorrect',
        HttpStatus.NOT_FOUND,
      );
    }

    if (
      await this.userService.compareHash(
        loginDto.password,
        user.password as string,
      )
    ) {
      return { token: await this.signIn(user.id, user.email) };
    }
  }

  async signIn(userId: string, email: string): Promise<string> {
    const payload = {
      id: userId,
      email,
    };

    return this.jwtService.sign(payload);
  }
}
