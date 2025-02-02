export class EntityAlreadyProcessed extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
