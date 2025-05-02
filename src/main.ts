import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { ResponseInterceptorService } from '@utils/interceptor/response/response.service';
import { ConfigService } from './config/config.service';
import { CommonExceptionFilter } from '@utils/filters/common-exception/common-exception.filter';
import { AppLoggerService } from './logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (errors) => {
        const messages = errors.flatMap((err) =>
          Object.values(err.constraints || {}),
        );
        return new BadRequestException(messages);
      },
    }),
  );
  app.use([cookieParser(), compression()]);
  app.enableCors();
  app.useGlobalInterceptors(new ResponseInterceptorService());
  const logger: Logger = new Logger(bootstrap.name);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  app.useGlobalFilters(
    new CommonExceptionFilter(new AppLoggerService(configService)),
  );

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addTag('products') // optional
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger available at /api

  const port = configService.get('PORT');
  await app.listen(`${port}`, () => {
    Logger.log('application running', 'MAIN');
    logger.log('system started');
    logger.log(`PORT:${port}`);
  });

  process.on('SIGINT', async () => {
    await app.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await app.close();
    process.exit(0);
  });
}
bootstrap();
