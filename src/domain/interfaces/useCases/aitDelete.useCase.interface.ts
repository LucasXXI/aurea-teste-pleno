export interface IDeleteAitUseCase {
    delete(id: string): Promise<string | Error>;
}