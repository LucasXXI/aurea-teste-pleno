export interface IProcessAitUseCase {
    processAllFines(): Promise<string | Error>;
}