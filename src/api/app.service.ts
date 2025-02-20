import morgan from 'morgan';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'src/config/db.config';
import { AllExceptionsFilter } from 'src/infrastructure/lib/filter/exception.filter';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';

export default class Application {
  public static async main(): Promise<void> {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'debug', 'log'],
    });
    app.useGlobalFilters(new AllExceptionsFilter());
    app.enableCors({
      origin: '*',
    });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    );
    app.useGlobalInterceptors(new ResponseInterceptor());

    const swaggerConfig = new DocumentBuilder()
      .setTitle('E-Commerce API')
      .setDescription(
        'Simple E-Commerce API using NestJS, TypeORM, and PostgreSQL',
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(config.PORT, () => {
      console.log(`Server running on ${config.PORT} port`);
      console.log(`Swagger URL: http://localhost:${config.PORT}/api/docs`);
    });
  }
}
