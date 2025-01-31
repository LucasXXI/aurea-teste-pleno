import { Inject, Injectable } from "@nestjs/common";
import { EntityNotFoundError } from "src/domain/exceptions/ait.notFound.error";
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
        
        if(aits instanceof EntityNotFoundError){
            return new EntityNotFoundError(aits.message);
        } 

        if(aits instanceof Error){
            return new Error(`Erro inesperado ao buscar AITs: ${aits.message}`);
        }

        return aits;

        //return await this.repository.list();
    }
    async listByFineId(fineId: string) : Promise<any | Error> {
        const ait = await this.repository.findOne(fineId);

        if (ait instanceof EntityNotFoundError) {
            return new EntityNotFoundError(ait.message);
        }
    
        if (ait instanceof Error) {
            return new Error(`Erro inesperado ao buscar AIT: ${ait.message}`);
        }
    
        return ait;
    }
}