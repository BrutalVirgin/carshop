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
  Post,
  UseInterceptors,
  UploadedFiles,
  Param,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { diskStorage } from 'multer';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from '../utils/file/file.upload';
import { v4 as uuid } from 'uuid';
import { AddVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';
import {
  SWAGGER_ADD_VEHICLE,
  SWAGGER_GET_MY_VEHICLES,
  SWAGGER_GET_ONE_VEHICLE,
  SWAGGER_LIST_OF_VEHICLES,
  SWAGGER_SCHEMA_ADD_CAR,
  SWAGGER_SCHEMA_UPDATE_CAR,
  SWAGGER_UPDATE_CAR,
} from '../utils/swagger/vehicle.swagger';

let imagesPrefix: string = uuid();

@ApiTags('Vehicle')
@ApiBearerAuth()
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('my-cars')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    schema: {
      type: 'object',
      example: SWAGGER_GET_MY_VEHICLES,
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async getAllMyCars(
    @Request() req: any,
    @Response() res: any,
  ): Promise<Vehicle[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.vehicleService.getAllMyCars(req.user.id));
  }

  @Get('list')
  @ApiOkResponse({
    schema: {
      type: 'object',
      example: SWAGGER_LIST_OF_VEHICLES,
    },
  })
  async getAllCars(
    @Request() req: any,
    @Response() res: any,
  ): Promise<Vehicle[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.vehicleService.getAllCars());
  }

  @Get('/:carId')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    schema: {
      type: 'object',
      example: SWAGGER_GET_ONE_VEHICLE,
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async getCar(
    @Request() req: any,
    @Response() res: any,
    @Param('carId') carId: string,
  ): Promise<Vehicle> {
    return res
      .status(HttpStatus.OK)
      .json(await this.vehicleService.getCar(req.user.id, carId));
  }

  @Post('')
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: SWAGGER_SCHEMA_ADD_CAR,
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      example: SWAGGER_ADD_VEHICLE,
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 10 }], {
      storage: diskStorage({
        destination: `./public/photos`,
        filename: (req, file, callback) =>
          editFileName(req, file, callback, imagesPrefix),
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async addCar(
    @Request() req: any,
    @Response() res: any,
    @UploadedFiles() { image }: { image: Express.Multer.File[] },
    @Body() addVehicleDto: AddVehicleDto,
  ): Promise<Vehicle> {
    imagesPrefix = uuid();
    const photosInfo = image.map((i) => {
      return {
        path: i.path,
      };
    });

    return res
      .status(HttpStatus.OK)
      .json(
        await this.vehicleService.addCar(
          req.user.id,
          addVehicleDto,
          photosInfo,
        ),
      );
  }

  @Patch('')
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: SWAGGER_SCHEMA_UPDATE_CAR,
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      example: SWAGGER_UPDATE_CAR,
    },
  })
  @ApiNotFoundResponse({ description: "This car doesn't exist" })
  @ApiBadRequestResponse({
    description: "You cannot update other people's cars",
  })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 10 }], {
      storage: diskStorage({
        destination: `./public/photos`,
        filename: (req, file, callback) =>
          editFileName(req, file, callback, imagesPrefix),
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateCar(
    @Request() req: any,
    @Response() res: any,
    @UploadedFiles() { image }: { image: Express.Multer.File[] },
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    imagesPrefix = uuid();
    const photosInfo =
      image && image.length
        ? image.map((i) => {
            return {
              path: i.path,
            };
          })
        : [];

    return res
      .status(HttpStatus.OK)
      .json(
        await this.vehicleService.updateCar(
          req.user.id,
          updateVehicleDto,
          photosInfo,
        ),
      );
  }

  @Delete('/:carId')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    schema: {
      type: 'object',
      example: {
        message: 'Car was deleted',
      },
    },
  })
  @ApiNotFoundResponse({ description: "This car doesn't exist" })
  @ApiBadRequestResponse({
    description: "You cannot delete other people's cars",
  })
  async deleteCar(
    @Request() req: any,
    @Response() res: any,
    @Param('carId') carId: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.vehicleService.deleteCar(req.user.id, carId));
  }
}
