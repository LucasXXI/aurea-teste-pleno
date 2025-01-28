export interface IListAitsUseCase {
    listAll(): Promise<any[]>;

    listByFineId(fineId: string): Promise<any[]>;
}