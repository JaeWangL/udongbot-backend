import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { FastifyReply } from 'fastify';
import { LoggerService } from '@shared/services';
import { ExceptionResponse } from '../interfaces';

@Catch()
export default class HttpExceptionsFilter implements ExceptionFilter {
  constructor(private readonly loggerSvc: LoggerService) {}

  catch(exception: any, host: ArgumentsHost): any {
    this.loggerSvc.error(exception.toString());

    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res = ctx.getResponse<FastifyReply>();
    const exceptionMessage: string | null = exception.message || null;
    const exceptionResponse: null | ExceptionResponse = exception.getResponse
      ? (exception.getResponse() as ExceptionResponse)
      : null;
    const status: number = exception.getStatus ? exception.getStatus() : 500;

    const mysqlCodes = {
      duplicateError: 'ER_DUP_ENTRY',
    };

    if (exception.code === mysqlCodes.duplicateError) {
      return res.status(HttpStatus.CONFLICT).send({ message: exceptionMessage, error: exceptionResponse });
    }

    return res.status(status).send({
      message: exceptionMessage,
      error: exceptionResponse,
    });
  }
}
