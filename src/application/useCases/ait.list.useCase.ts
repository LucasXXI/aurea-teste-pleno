import { Inject, Injectable } from "@nestjs/common";
import { IAitRepository } from "src/domain/interfaces/repository/sql/ait.repository.interface";
import { IListAitsUseCase } from "src/domain/interfaces/useCases/aitList.useCase.interface";

@Injectable()
export class ListAitUseCase implements IListAitsUseCase{
    constructor
    (
        @Inject('IAitRepository')
        private readonly repository: IAitRepository
    ) {}

    async listAll(): Promise<any[] | Error> {
        const aits = await this.repository.findAll();
        
        if(aits instanceof Error){
            return aits;
        } 

        return aits;

        //return await this.repository.list();
    }
    async listByFineId(fineId: string) : Promise<any | Error> {
        const ait = await this.repository.findOne(fineId);

        if(ait instanceof Error){
            return ait;
        }

        return ait;
        //return await this.repository.listByFineId(fineId);
    }
}