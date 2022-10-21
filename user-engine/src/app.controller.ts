import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @MessagePattern('create-user')
  create(@Payload() value: CreateUserDto): Promise<UserDto> {
    return this.appService.create(value);
  }

  @MessagePattern('find-all-user')
  index(): Promise<UserDto[]> {
    return this.appService.findAll();
  }

  @MessagePattern('find-user')
  findOne(@Payload() id: string): Promise<UserDto> {
    return this.appService.findOne(id);
  }

  @MessagePattern('update-user')
  update(@Payload() { id, updateUserDto }: any): Promise<void> {
    return this.appService.update(id, updateUserDto);
  }

  @MessagePattern('delete-user')
  remove(@Payload() id: string): Promise<void> {
    return this.appService.remove(id);
  }
}
