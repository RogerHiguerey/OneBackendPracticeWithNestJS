// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  try {
    await app.listen(8000);
    const url = await app.getUrl();
    const formattedUrl = url.replace('[::1]', 'localhost'); // Reemplazar IPv6 con localhost
    console.log(
      `📢  🖥️  🥳 The application is running as expected on the port : ${formattedUrl}`,
    );
  } catch (error) {
    console.error('Error starting the application', error);
  }
}
bootstrap();
