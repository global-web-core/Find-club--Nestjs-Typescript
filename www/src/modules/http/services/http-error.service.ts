// error-handling.service.ts
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

@Injectable()
export class HttpErrorService {
  public handleError(error: unknown) {
		if (error instanceof Error) {
      if (!(error instanceof NotFoundException)) {
        throw new InternalServerErrorException(error.message);
      }
    }
		
		throw error;
  }
}
