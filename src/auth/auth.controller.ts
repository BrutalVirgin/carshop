import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { SWAGGER_REGISTRATION_USER } from '../utils/swagger/auth.swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User with this name already exists' })
  async register(
    @Response() res: any,
    @Body() registerDto: RegisterDto,
  ): Promise<User> {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.createUser(registerDto));
  }

  @Post('login')
  @ApiOkResponse({
    schema: {
      type: 'object',
      example: SWAGGER_REGISTRATION_USER,
    },
  })
  @ApiNotFoundResponse({ description: 'User not found or email is incorrect' })
  async login(
    @Response() res: any,
    @Body() loginDto: LoginDto,
  ): Promise<{ token: string }> {
    return res
      .status(HttpStatus.OK)
      .json(await this.authService.login(loginDto));
  }
}
