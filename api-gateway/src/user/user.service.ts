import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user-purchase',
        brokers: ['host.docker.internal:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  client: ClientKafka;
  async onModuleInit() {
    const requestPatters = ['find-all-user', 'find-user', 'create-user'];

    if (requestPatters.length > 0) {
      requestPatters.forEach(async (pattern) =>
        this.client.subscribeToResponseOf(pattern),
      );
      await this.client.connect();
    }
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async create(createUserDto: CreateUserDto): Promise<Observable<UserDto>> {
    return this.client.send('create-user', {
      ...createUserDto,
    });
  }

  findAll(): Observable<UserDto[]> {
    return this.client.send('find-all-user', {});
  }

  findOne(id: string): Observable<UserDto> {
    return this.client.send('find-user', { id });
  }

  update(id: string, updateUserDto: Partial<UpdateUserDto>) {
    return this.client.emit('update-user', {
      id,
      updateUserDto,
    });
  }

  remove(id: string) {
    return this.client.emit('delete-user', { id });
  }
}
