import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Response,
  Request,
  UseGuards,
  Get,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user.dto';
import { AuthGuard } from '../auth/auth.guard';
import {
  SWAGGER_GET_USER,
  SWAGGER_UPDATE_USER,
} from '../utils/swagger/user.swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    schema: {
      type: 'object',
      example: SWAGGER_GET_USER,
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async getUser(@Request() req: any, @Response() res: any): Promise<User> {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.getUserById(req.user.id));
  }

  @Patch('')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    schema: {
      type: 'object',
      example: SWAGGER_UPDATE_USER,
    },
  })
  @ApiForbiddenResponse({ description: 'User with this name already exists' })
  async updateUser(
    @Request() req: any,
    @Response() res: any,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.updateUser(req.user.id, updateUserDto));
  }

  @Delete('')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    schema: {
      type: 'object',
      example: {
        message: 'User was deleted',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async deleteUser(@Request() req: any, @Response() res: any) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.deleteUserById(req.user.id));
  }
}
