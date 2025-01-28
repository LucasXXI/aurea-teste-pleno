export interface IDeleteAitUseCase {
    execute(id: string): Promise<void>;
}