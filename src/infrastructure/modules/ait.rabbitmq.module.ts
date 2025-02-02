import { Global, Module } from '@nestjs/common';
import { RabbitMqService } from '../messaging/rabbitMq/rabbitmq.service';
import { RabbitMqRepository } from '../messaging/rabbitMq/repository/rabbitmq.repository';

@Global()
@Module({
  providers: [
    RabbitMqService,
    {
      provide: 'IRabbitMqRepository',
      useClass: RabbitMqRepository,
    },
  ],
  exports: [RabbitMqService, 'IRabbitMqRepository'],
})
export class RabbitMqModule {}
