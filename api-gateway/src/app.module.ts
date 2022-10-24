import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filter/all-exceptions.filter';
import { UserModule } from './user/user.module';
import { PurchaseModule } from './purchase/purchase.module';
import { CommonModule } from './common/common.module';

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
    PurchaseModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
