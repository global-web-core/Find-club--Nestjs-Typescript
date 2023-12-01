import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { STATUS_RESPONSE } from '../../../constants/response.constants';
import { getNameErrorByStatusCode } from '../helpers/common.helpers';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
		
    let message = getNameErrorByStatusCode(status);
		
    if (typeof exceptionResponse === 'string' && message !== exceptionResponse) {
			message = message + ' ' + exceptionResponse;
    } else if (exceptionResponse && typeof exceptionResponse === 'object') {
			if ('message' in exceptionResponse) {
        if (Array.isArray(exceptionResponse.message)) {
          const joinedMessages = ' | ' + exceptionResponse.message.join(' | ');
          if (message !== joinedMessages) message = message + joinedMessages;
        } else if (typeof exceptionResponse.message === 'string' && message !== exceptionResponse.message) {
          message = message + ' | ' + exceptionResponse.message;
        }
      }
    }

    response.status(status).json({
			status: STATUS_RESPONSE.ERROR,
      сode: status,
      error: message,
    });
  }
}
