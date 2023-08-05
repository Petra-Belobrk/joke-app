import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  app.setGlobalPrefix(`api/${configService.get<string>('APP_NAME')}`);

  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('API_TITLE'))
    .setDescription(configService.get<string>('API_DESCRIPTION'))
    .setVersion(configService.get<string>('API_VERSION'))
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    `${configService.get<string>('API_DOCUMENTATION_PATH')}`,
    app,
    document,
  );

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(configService.get<string>('APP_PORT'));
}
bootstrap();
