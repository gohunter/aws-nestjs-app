import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const { code, name, error, message }: any = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      code: code ?? null,
      name: name ?? null,
      error: error ?? null,
      message: message ?? null,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
