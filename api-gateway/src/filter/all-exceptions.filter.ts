import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import Logger from '../config/winston.config';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception.response?.message ||
      exception.response?.data ||
      exception.message ||
      exception.message?.error;

    const service =
      exception.response?.service ||
      String(httpAdapter.getRequestUrl(ctx.getRequest()));

    const method = exception.response?.method || ctx.getRequest().method;

    const responseBody: any = {
      service,
      method,
      message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

    responseBody.statusCode = httpStatus;

    Logger.error({ responseBody });
  }
}
