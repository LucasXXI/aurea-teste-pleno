import { Injectable } from "@nestjs/common";
import { IListAitsUseCase as IListAitUseCase } from "src/domain/interfaces/useCases/aitList.useCase.interface";

@Injectable()
export class ListAitUseCase implements IListAitUseCase{
    // constructor(repository) {
    //     this.repository = repository;
    // }

    async listAll(): Promise<any[]> {
        throw new Error("Method not implemented.");
        return [];
        //return await this.repository.list();
    }
    async listByFineId(fineId: string) {
        throw new Error("Method not implemented.");
        return [];
        //return await this.repository.listByFineId(fineId);
    }
}