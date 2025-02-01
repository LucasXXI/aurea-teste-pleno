import { ICsvGeneratorRepository } from "src/domain/interfaces/repository/csvGenerator/csvGenerator.repository.interface";
import { CsvGenratorService } from "../csvGenerator.service";
import { Injectable } from "@nestjs/common";
import { CsvGeneratorError } from "src/domain/exceptions/csvGenerator.failed";

@Injectable()
export class CsvGeneratorRepository implements ICsvGeneratorRepository {
    constructor(
        private readonly csvGeneratorService: CsvGenratorService
    ) {}

    async saveCsv(data: any[]): Promise<string | Error> {
        try {
            return await this.csvGeneratorService.generateCsv(data);
        } catch (error) {
            throw new CsvGeneratorError(error.message);
        }
    }
}