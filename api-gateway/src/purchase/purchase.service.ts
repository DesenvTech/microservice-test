import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseDto } from './dto/purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Injectable()
export class PurchaseService implements OnModuleInit, OnModuleDestroy {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'purchase',
        brokers: ['host.docker.internal:9092'],
      },
      consumer: {
        groupId: 'purchase-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  client: ClientKafka;
  async onModuleInit() {
    const requestPatters = [
      'find-all-purchase',
      'find-purchase',
      'create-purchase',
    ];

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

  async create(
    createPurchaseDto: CreatePurchaseDto,
  ): Promise<Observable<PurchaseDto>> {
    return this.client.send('create-purchase', {
      payload: createPurchaseDto,
    });
  }

  findAll(): Observable<PurchaseDto[]> {
    return this.client.send('find-all-purchase', {});
  }

  findOne(id: string): Observable<PurchaseDto> {
    return this.client.send('find-purchase', { id });
  }

  update(id: string, updatePurchaseDto: Partial<UpdatePurchaseDto>) {
    return this.client.emit('update-purchase', {
      id,
      updatePurchaseDto,
    });
  }

  remove(id: string) {
    return this.client.emit('delete-purchase', { id });
  }
}
