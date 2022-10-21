import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const options = new DocumentBuilder()
    .setTitle('App example')
    .setDescription('The app API description')
    .setVersion('1.0')
    .addTag('app')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(configService.get<number>('PORT'), () =>
    logger.log(
      `Microservice is running on port: ${
        configService.get<number>('PORT') || 3000
      }`,
    ),
  );
}
bootstrap();
