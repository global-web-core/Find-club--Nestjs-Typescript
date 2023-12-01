import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { RESPONSE_INVALID_API_KEY } from 'src/constants/response.constants';

@Injectable()
export class CheckApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

	private respondWithInvalidApiKey(res: Response) {
    res.status(401).json(RESPONSE_INVALID_API_KEY);
  }
  use(req: Request, res: Response, next: NextFunction) {
		const headerApiKey = this.configService.get<string>('API_KEY_HEADER');
    const validApiKey = this.configService.get<string>('API_KEY_VALUE');
		
		if (!headerApiKey || !validApiKey) return this.respondWithInvalidApiKey(res);
		
    const apiKey = req.headers[headerApiKey.toLowerCase()];
		
    if (!apiKey || apiKey !== validApiKey) return this.respondWithInvalidApiKey(res);
		
		next();
  }
}
