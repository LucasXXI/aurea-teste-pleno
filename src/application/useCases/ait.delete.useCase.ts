import { Inject, Injectable } from "@nestjs/common";
import { IAitRepository } from "src/domain/interfaces/repository/sql/ait.repository.interface";
import { IDeleteAitUseCase } from "src/domain/interfaces/useCases/aitDelete.useCase.interface";

@Injectable()
export class DeleteAitUseCase implements IDeleteAitUseCase {
    constructor(
        @Inject('IAitRepository')
        private readonly repository: IAitRepository
    ) {}
        
    async delete(id: string): Promise<boolean | Error> {
        const deletedAit = await this.repository.delete(id);

        if(deletedAit instanceof Error) return deletedAit;

        if(deletedAit != true){
            return false;
        }

        return true;
        //add fluxo pra validar
    }
}