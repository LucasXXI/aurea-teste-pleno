export interface IDeleteAitUseCase {
  delete(id: string): Promise<boolean | Error>;
}
