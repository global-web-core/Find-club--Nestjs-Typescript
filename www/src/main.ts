import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DEFAULT_APP_PORT, DEFAULT_PREFIX_API } from './constants/config.constants';
import { HttpExceptionFilter } from './modules/http/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	
	// constants config
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT', DEFAULT_APP_PORT);
  const prefixApi = configService.get<string>('PREFIX_API', DEFAULT_PREFIX_API);
	
	// settings
	app.setGlobalPrefix(prefixApi);
	app.enableCors();
	app.useGlobalFilters(new HttpExceptionFilter());

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
		})
	);

	if (process.env.NODE_ENV !== 'production') {
		const config = new DocumentBuilder()
			.setTitle('Desires API')
			.setDescription('API for managing')
			.setVersion('1.0.1')
			.addTag('HTTP')
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup(prefixApi, app, document);
	}

  await app.listen(port);

	if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
