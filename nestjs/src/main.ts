import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ModelNotFoundException } from './exception-filters/model-not-found.exception';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ModelNotFoundException());
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER],
      },
      consumer: {
        groupId:
          !process.env.KAFKA_CONSUMER_GROUP_ID ||
          process.env.KAFKA_CONSUMER_GROUP_ID === ''
            ? `my-consumer-${Math.random()}`
            : process.env.KAFKA_CONSUMER_GROUP_ID,
      },
    },
  });
  app.startAllMicroservices();
  await app.listen(8080);
}

bootstrap();
