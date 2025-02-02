export interface IRabbitMqRepository {
  publish(message: any): Promise<string | Error>;
}
