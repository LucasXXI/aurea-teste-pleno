import { Global, Module } from '@nestjs/common';
import { CsvGenratorService } from '../csv/csvGenerator.service';
import { CsvGeneratorRepository } from '../csv/repository/csvGenerator.repository';

@Global()
@Module({
  providers: [
    CsvGenratorService,
    {
        provide: 'ICsvGeneratorRepository',
        useClass: CsvGeneratorRepository
    }
  ],
  exports: [CsvGenratorService, 'ICsvGeneratorRepository'],
})
export class CsvModule {}