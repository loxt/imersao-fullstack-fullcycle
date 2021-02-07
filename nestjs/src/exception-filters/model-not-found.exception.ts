import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Response } from 'express';

@Catch(EntityNotFoundError)
export class ModelNotFoundException implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    return response.status(400).json({
      error: {
        error: 'not found',
        message: exception.message,
      },
    });
  }
}
