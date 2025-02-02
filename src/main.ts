import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('AIT Api - Aurea')
    .setDescription(
      'API para manipulação de Autos de Infração de Trânsito (AITs)',
    )
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`API rodando em http://localhost: ${process.env.PORT ?? 3000}`);
  console.log('Swagger disponível em http://localhost:3000/swagger');
}
bootstrap();
