import { Inject, Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'src/domain/exceptions/ait.notFound.error';
import { ICsvGeneratorRepository } from 'src/domain/interfaces/repository/csvGenerator/csvGenerator.repository.interface';
import { IRabbitMqRepository } from 'src/domain/interfaces/repository/rabbitMq/rabbitMq.repository.interface';
import { IAitRepository } from 'src/domain/interfaces/repository/sql/ait.repository.interface';
import { IProcessAitUseCase } from 'src/domain/interfaces/useCases/ait.processor.useCase.interface';

@Injectable()
export class ProcessAitUseCase implements IProcessAitUseCase {
  constructor(
    @Inject('IAitRepository')
    private readonly aitRepository: IAitRepository,
    @Inject('ICsvGeneratorRepository')
    private readonly csvGeneratorRepository: ICsvGeneratorRepository,
    @Inject('IRabbitMqRepository')
    private readonly messageBrokerRepository: IRabbitMqRepository,
  ) {}

  async processAllFines(): Promise<string | Error> {
    const processedAits = await this.aitRepository.processAits();

    if (processedAits instanceof EntityNotFoundError) {
      return new EntityNotFoundError(processedAits.message);
    }

    if (processedAits instanceof Error) {
      return new Error(processedAits.message);
    }

    const generatedAitsCsv =
      await this.csvGeneratorRepository.saveCsv(processedAits);

    const publishedAitsReport =
      await this.messageBrokerRepository.publish(generatedAitsCsv);

    return publishedAitsReport;
  }
}
