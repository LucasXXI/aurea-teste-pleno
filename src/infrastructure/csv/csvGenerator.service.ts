import { Parser } from '@json2csv/plainjs';
import { Injectable } from '@nestjs/common';
import { writeFile, mkdir, access } from 'fs/promises';
import { constants } from 'fs';
import { CsvGeneratorError } from 'src/domain/exceptions/csvGenerator.failed';
import { ListAitsDAO } from '../database/prisma/daos/lait.listed.dao';

@Injectable()
export class CsvGenratorService {
  async generateCsv(data: ListAitsDAO[]): Promise<string | Error> {
    try {
      const fields = [
        'id',
        'placaVeiculo',
        'dataInfracao',
        'descricao',
        'valorMulta',
        'status',
        'createdAt',
        'dataProcessamento',
        'updatedAt',
      ];

      const json2csvParser = new Parser({ fields });

      const csvData = data.map((item) => ({
        id: item.id,
        placaVeiculo: item.placaVeiculo,
        dataInfracao: item.dataInfracao.toISOString(),
        descricao: item.descricao,
        valorMulta: item.valorMulta,
        status: item.status,
        createdAt: item.createdAt.toISOString(),
        dataProcessamento: item.dataProcessamento
          ? item.dataProcessamento.toISOString()
          : '',
        updatedAt: item.updatedAt ? item.updatedAt.toISOString() : '',
      }));

      const filePath = './exports/aits.csv';

      const csv = json2csvParser.parse(csvData);

      await mkdir('./exports', { recursive: true });

      await writeFile(filePath, csv);

      await access(filePath, constants.F_OK);

      return csv;
    } catch (error) {
      throw new CsvGeneratorError(`Erro ao gerar CSV: ${error.message}`);
    }
  }
}
