import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  abstract;
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.create({
        ...createUserDto,
      });
      const response = await this.userRepository.save(user);

      return JSON.parse(JSON.stringify(response));
    } catch (err) {
      return err;
    }
  }

  async findAll(): Promise<UserDto[]> {
    try {
      return await this.userRepository.find();
    } catch (err) {
      return err;
    }
  }

  async findOne(id: string): Promise<UserDto> {
    try {
      const response = await this.userRepository.findOne({
        where: {
          id,
        },
      });

      return JSON.parse(JSON.stringify(response));
    } catch (err) {
      return err;
    }
  }

  async update(id: string, updateUserDto: Partial<UpdateUserDto>) {
    try {
      return await this.userRepository.update(id, updateUserDto);
    } catch (err) {
      return err;
    }
  }

  async remove(id: string) {
    try {
      return await this.userRepository.delete(id);
    } catch (err) {
      return err;
    }
  }
}
