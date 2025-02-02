import { Module } from '@nestjs/common';
import { AitsController } from '../controllers/aits.controller';
import { registerAitUseCase } from 'src/application/useCases/ait.register.useCase';
import { UpdateAitUseCase } from 'src/application/useCases/ait.update.useCase';
import { ListAitUseCase } from 'src/application/useCases/ait.list.useCase';
import { DeleteAitUseCase } from 'src/application/useCases/ait.delete.useCase';
import { ProcessAitUseCase } from 'src/application/useCases/ait.process.useCase';
import { PrismaModule } from 'src/infrastructure/modules/ait.prisma.module';
import { RabbitMqModule } from 'src/infrastructure/modules/ait.rabbitmq.module';
import { CsvModule } from 'src/infrastructure/modules/ait.csvGenerator.module';

@Module({
  controllers: [AitsController],
  imports: [PrismaModule, RabbitMqModule, CsvModule],
  providers: [
    {
      provide: 'IRegisterAitUseCase',
      useClass: registerAitUseCase,
    },
    {
      provide: 'IUpdateAitUseCase',
      useClass: UpdateAitUseCase,
    },
    {
      provide: 'IListAitUseCase',
      useClass: ListAitUseCase,
    },
    {
      provide: 'IDeleteAitUseCase',
      useClass: DeleteAitUseCase,
    },
    {
      provide: 'IUpdateAitUseCase',
      useClass: UpdateAitUseCase,
    },
    {
      provide: 'IProcessAitUseCase',
      useClass: ProcessAitUseCase,
    },
  ],
})
export class AitsModule {}
