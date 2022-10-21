import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filter/all-exceptions.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    CommonModule.register({
      configModule: {
        ignoreEnvFile: ['production', 'staging'].includes(process.env.NODE_ENV),
        envFilePath: '.env',
        expandVariables: ['development', 'test'].includes(process.env.NODE_ENV),
        cache: ['production', 'staging'].includes(process.env.NODE_ENV),
        isGlobal: true,
      },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
