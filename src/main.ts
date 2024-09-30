import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Api Vagas PCDs')
    .setVersion('1.0')
    .addTag('Vagas')
    .addTag('Usuarios')
    .build();

  const swaggerCDN: string = process.env.SWAGGER_CDN_URL;
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document,
    {
      customCssUrl: `${swaggerCDN}/swagger-ui.css`,
      customJs: [
        `${swaggerCDN}/swagger-ui-bundle.js`,
        `${swaggerCDN}/swagger-ui-standalone-preset.js`,
      ]
    });

  await app.listen(process.env.PORT || 3000);
  console.log(`Listening at http://localhost:${process.env.PORT}`)
}
bootstrap();
