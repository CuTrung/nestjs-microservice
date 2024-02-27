import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { initApp } from './init';
async function bootstrap() {
  let app = await NestFactory.create(AppModule);
  const { port, url, ...envs_var } = app.get(ConfigService).get('env');
  app = await initApp(app, envs_var);
  await app.listen(port);
  Logger.log(`🚀 Application is running on: ${url}`);
}

bootstrap();
