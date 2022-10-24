import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(UserController.name);

  @MessagePattern('create-user')
  create(@Payload() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  @MessagePattern('find-all-user')
  index(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @MessagePattern('find-user')
  findOne(@Payload() id: string): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @MessagePattern('update-user')
  update(@Payload() { id, updateUserDto }: any): Promise<void> {
    return this.userService.update(id, updateUserDto);
  }

  @MessagePattern('delete-user')
  remove(@Payload() id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
