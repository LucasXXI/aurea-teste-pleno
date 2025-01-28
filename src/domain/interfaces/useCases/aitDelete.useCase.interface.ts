export interface IDeleteAitUseCase {
    delete(id: string): Promise<void>;
}