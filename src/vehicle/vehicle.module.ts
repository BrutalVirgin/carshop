import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Photo } from './entities/photo.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle]),
    TypeOrmModule.forFeature([Photo]),
    UserModule,
  ],
  providers: [VehicleService],
  controllers: [VehicleController],
})
export class VehicleModule {}
