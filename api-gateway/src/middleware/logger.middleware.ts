import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import Logger from '../config/winston.config';
const isEmpty = (obj) => JSON.stringify(obj) === '{}';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const { method, originalUrl, body, params, query } = request;
    const { statusCode } = response;

    const responseToLog: any = { method, service: originalUrl, statusCode };

    if (query && !isEmpty(query)) responseToLog.query = query;
    if (params && !isEmpty(params) && !Object.keys(params).includes('0'))
      responseToLog.params = params;
    if (body && !isEmpty(body)) responseToLog.body = body;

    Logger.info({ responseToLog });

    next();
  }
}
