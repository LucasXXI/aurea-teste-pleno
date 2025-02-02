export class CsvGeneratorError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
