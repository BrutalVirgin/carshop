import { IsString, IsNotEmpty, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddVehicleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  carManufacturer: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  carModel: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(17, 17)
  vin: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  year: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(0, 240)
  description: string;
}

export class UpdateVehicleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  carId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  carManufacturer: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  carModel: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(17, 17)
  vin: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  year: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(0, 240)
  description: string;
}
