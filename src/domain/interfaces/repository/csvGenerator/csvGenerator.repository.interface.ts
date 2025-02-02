export interface ICsvGeneratorRepository {
  saveCsv(data: any[]): Promise<string | Error>;
}
