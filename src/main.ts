import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import config from './config/configuration';
import { HttpExceptionFilter } from './filters/exception.filter';

const globalPrefix = '/api/v1';
const configureSwagger = (app: INestApplication) => {
  const baseApis = '/' + config().baseUrl + globalPrefix;
  const baseUrl = baseApis.replace('//', '/');
  const swaggerDocOptions = new DocumentBuilder()
    .setTitle('Zuj Backend')
    .setDescription('The zuj-backend API description')
    .setVersion('1.0.0')
    .addServer(baseUrl)
    .setBasePath(baseUrl)
    .addBearerAuth(
      {
        type: 'apiKey',
        scheme: 'JWT',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Type into the text box: Bearer {your JWT token}',
        in: 'header',
      },
      'JWT',
    )
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerDocOptions, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('/v1/docs', app, swaggerDoc);
};

const configureValidation = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);
  configureSwagger(app);
  configureValidation(app);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(config().port);
  console.log(`Application is running on: ${await app.getUrl()}`);
};
bootstrap();
