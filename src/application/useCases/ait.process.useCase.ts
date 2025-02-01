import { Inject, Injectable } from "@nestjs/common";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { EntityNotFoundError } from "src/domain/exceptions/ait.notFound.error";
import { ICsvGeneratorRepository } from "src/domain/interfaces/repository/csvGenerator/csvGenerator.repository.interface";
import { IRabbitMqRepository } from "src/domain/interfaces/repository/rabbitMq/rabbitMq.repository.interface";
import { IAitRepository } from "src/domain/interfaces/repository/sql/ait.repository.interface";
import { IProcessAitUseCase } from "src/domain/interfaces/useCases/ait.processor.useCase.interface";

@Injectable()
export class ProcessAitUseCase implements IProcessAitUseCase {
    constructor(
        @Inject('IAitRepository')
        private readonly aitRepository: IAitRepository,
        @Inject('ICsvGeneratorRepository')
        private readonly csvGeneratorRepository: ICsvGeneratorRepository,
        @Inject('IRabbitMqRepository')
        private readonly messageBrokerRepository: IRabbitMqRepository
    ){}

    async processAllFines(): Promise<string | Error> {
        //const csvPath = './exports/aits.csv'

        const processedAits = await this.aitRepository.processAits();
        
        if(processedAits instanceof EntityNotFoundError){
            // if(existsSync(csvPath)){
            //     const file = await readFile(csvPath, 'base64');

            //     await this.messageBrokerRepository.publish(file);
            // }

            return new EntityNotFoundError(processedAits.message);
        }

        if(processedAits instanceof Error){
            return new Error(processedAits.message);
        }

        const generatedAitsCsv = await this.csvGeneratorRepository.saveCsv(processedAits);

        const publishedAitsReport = await this.messageBrokerRepository.publish(generatedAitsCsv);

        return publishedAitsReport;
    }
}