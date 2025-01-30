export interface IListAitsUseCase {
    listAll(): Promise<any[] | Error >;

    listByFineId(fineId: string): Promise< any | Error>;
}