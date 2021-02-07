import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ModelNotFoundException } from './exception-filters/model-not-found.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ModelNotFoundException());
  await app.listen(8080);
}

bootstrap();
