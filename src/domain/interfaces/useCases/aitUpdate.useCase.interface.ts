export interface IUpdateAitUseCase {
    execute(id: string, data: any): Promise<any>;
}
