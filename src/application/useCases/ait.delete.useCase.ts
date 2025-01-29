import { Inject, Injectable } from "@nestjs/common";
import { IAitRepository } from "src/domain/interfaces/repository/sql/ait.repository.interface";
import { IDeleteAitUseCase } from "src/domain/interfaces/useCases/aitDelete.useCase.interface";

@Injectable()
export class DeleteAitUseCase implements IDeleteAitUseCase {
    constructor(
        @Inject('IAitRepository')
        private readonly repository: IAitRepository
    ) {}
        
    async delete(id: string): Promise<string> {
        const deletedAit = await this.repository.delete(id);

        if(deletedAit == true){
            return 'Ait deletado com sucesso';
        }

        return 'Erro ao deletar ait';

        //add fluxo pra validar
    }
}