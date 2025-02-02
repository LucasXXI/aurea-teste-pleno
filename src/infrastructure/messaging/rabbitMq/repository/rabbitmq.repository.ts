import { IRabbitMqRepository } from 'src/domain/interfaces/repository/rabbitMq/rabbitMq.repository.interface';
import { RabbitMqService } from '../rabbitmq.service';
import { Injectable } from '@nestjs/common';
import { PublishInQueueError } from 'src/domain/exceptions/rabbitmq.failed';

@Injectable()
export class RabbitMqRepository implements IRabbitMqRepository {
  private readonly rabbitMqService: RabbitMqService;

  constructor(rabbitMqService: RabbitMqService) {
    this.rabbitMqService = rabbitMqService;
  }

  async publish(message: any): Promise<string | Error> {
    try {
      const publish = await this.rabbitMqService.publish(message);

      if (publish == true) {
        return 'Mensagem confirmada na fila';
      }

      return new PublishInQueueError('Falha ao publicar mensagem na fila');
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
