export interface IAitService {
    list(): Promise<any[]>;
    listByFineId(fineId: string): Promise<any[]>;
    delete(id: string): Promise<void>;
    process(): Promise<any>;
    register(data: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
}

export const IAitService = Symbol("IAitService");
