export interface IListAitsUseCase {
    execute(): Promise<any[]>;

    executeByFineId(fineId: string): Promise<any[]>;
}