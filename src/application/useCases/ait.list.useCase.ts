import { Injectable } from "@nestjs/common";
import { IListAitsUseCase } from "src/domain/interfaces/useCases/aitList.useCase.interface";

@Injectable()
export class ListAitsUseCase implements IListAitsUseCase{
    // constructor(repository) {
    //     this.repository = repository;
    // }

    async execute(): Promise<any[]> {
        throw new Error("Method not implemented.");
        return [];
        //return await this.repository.list();
    }
    async executeByFineId(fineId: string) {
        throw new Error("Method not implemented.");
        return [];
        //return await this.repository.listByFineId(fineId);
    }
}