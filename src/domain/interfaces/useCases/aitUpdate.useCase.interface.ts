export interface IUpdateAitUseCase {
    update(id: string, data: any): Promise<any>;
}
