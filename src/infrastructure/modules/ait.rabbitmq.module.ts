import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { AitRepository } from '../database/repository/ait.repository';
import { RabbitMqService } from '../messaging/rabbitMq/rabbitmq.service';

@Global()
@Module({
  providers: [
    RabbitMqService
  ],
  exports: [RabbitMqService],
})
export class PrismaModule {}