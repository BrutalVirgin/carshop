import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Photo } from './entities/photo.entity';
import { AddVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    private readonly userService: UserService,
  ) {}

  async addCar(
    userId: string,
    data: AddVehicleDto,
    photosInfo: { path: string }[],
  ): Promise<Vehicle> {
    const user = await this.userService.getUserById(userId);

    const vehicle = await this.vehicleRepository.save({
      user: user,
      author: user.email,
      carManufacturer: data.carManufacturer,
      carModel: data.carModel,
      vin: data.vin,
      year: +data.year,
      image: photosInfo[0].path,
      description: data.description,
    });

    const photos: any[] = photosInfo.map((i) => {
      return {
        url: i.path,
        vehicle: vehicle,
      };
    });

    await this.photoRepository.save(photos);
    return await this.vehicleRepository.findOne({
      where: { id: vehicle.id },
    });
  }

  async updateCar(
    userId: string,
    data: UpdateVehicleDto,
    photosInfo: { path: string }[],
  ): Promise<Vehicle> {
    const carIfExists = await this.vehicleRepository.findOne({
      where: { id: data.carId },
      relations: { user: true },
    });

    if (!carIfExists) {
      throw new HttpException("This car doesn't exist", HttpStatus.NOT_FOUND);
    }

    if (carIfExists.user.id !== userId) {
      throw new HttpException(
        "You cannot update other people's cars",
        HttpStatus.BAD_REQUEST,
      );
    }

    const vehicle = await this.vehicleRepository.update(
      {
        id: data.carId,
      },
      {
        carManufacturer: data.carManufacturer ?? carIfExists.carManufacturer,
        carModel: data.carModel ?? carIfExists.carModel,
        vin: data.vin ?? carIfExists.vin,
        year: data.year ? +data.year : +carIfExists.year,
        image: photosInfo.length ? photosInfo[0].path : carIfExists.image,
        description: data.description ?? carIfExists.description,
      },
    );

    if (photosInfo && photosInfo.length) {
      const photos: any[] = photosInfo.map((i) => {
        return {
          url: i.path,
          vehicle: vehicle,
        };
      });

      await this.photoRepository.save(photos);
    }
    return await this.vehicleRepository.findOne({
      where: { id: data.carId },
    });
  }

  async getAllMyCars(userId: string): Promise<Vehicle[]> {
    return this.vehicleRepository.find({
      where: {
        user: { id: userId },
      },
      relations: { photos: true },
      select: [
        'id',
        'author',
        'carManufacturer',
        'carModel',
        'year',
        'vin',
        'image',
        'description',
        'createdAt',
      ],
    });
  }

  async getAllCars(): Promise<Vehicle[]> {
    return this.vehicleRepository.find({
      select: [
        'id',
        'author',
        'carManufacturer',
        'carModel',
        'year',
        'createdAt',
        'image',
        'description',
      ],
    });
  }

  async getCar(userId: string, carId: string): Promise<Vehicle> {
    const car = await this.vehicleRepository.findOne({
      where: {
        id: carId,
      },
      relations: { photos: true, user: true },
      select: [
        'id',
        'author',
        'carManufacturer',
        'carModel',
        'year',
        'vin',
        'description',
        'createdAt',
      ],
    });

    if (car.user.id !== userId) {
      car.vin = this.maskOffVinCode(car.vin);
    }

    delete car.user;
    return car;
  }

  maskOffVinCode(vin: string): string {
    const firstFour = vin.substring(0, 4);
    const lastFour = vin.substring(vin.length - 4);

    return `${firstFour}****${lastFour}`;
  }

  async deleteCar(userId: string, carId: string) {
    const car = await this.vehicleRepository.findOne({
      where: {
        id: carId,
      },
      relations: { user: true },
    });

    if (!car) {
      throw new HttpException("This car doesn't exist", HttpStatus.NOT_FOUND);
    }

    if (car.user.id === userId) {
      await this.photoRepository.delete({ vehicle: { id: carId } });
      await this.vehicleRepository.delete({ id: carId });

      return { message: 'Car was deleted' };
    }

    throw new HttpException(
      "You cannot delete other people's cars",
      HttpStatus.BAD_REQUEST,
    );
  }
}
