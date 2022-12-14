import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'user-and-purchase',
          brokers: ['host.docker.internal:9092'],
        },
        consumer: {
          groupId: 'user-and-purchase-consumer',
          allowAutoTopicCreation: true,
        },
      },
    },
  );

  await app.listen().then(() => logger.log('Microservice is running'));
}
bootstrap();
