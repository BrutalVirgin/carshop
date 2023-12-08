import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { Photo } from './photo.entity';

@Entity()
export class Vehicle {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  author: string;

  @ApiProperty()
  @Column()
  carManufacturer: string;

  @ApiProperty()
  @Column()
  carModel: string;

  @ApiProperty()
  @Column()
  vin: string;

  @ApiProperty()
  @Column()
  year: number;

  @ApiProperty()
  @Column()
  image: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.vehicles)
  user: User;

  @OneToMany(() => Photo, (photo) => photo.vehicle)
  photos: Photo[];
}
