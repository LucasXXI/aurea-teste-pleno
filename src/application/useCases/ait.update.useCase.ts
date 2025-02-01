import { Inject, Injectable } from "@nestjs/common";
import { IUpdateAitUseCase } from "src/domain/interfaces/useCases/aitUpdate.useCase.interface";
import { UpdateAitDto } from "../dtos/requests/ait.update.dto";
import { UpdatedAitResponseDTO } from "../dtos/responses/ait.updated.response";
import { IAitRepository } from "src/domain/interfaces/repository/sql/ait.repository.interface";
import { AitMapper } from "../mappers/ait.entitty.mapper";
import { EntityNotFoundError } from "src/domain/exceptions/ait.notFound.error";
import { ListAitsDAO } from "src/infrastructure/database/prisma/daos/lait.listed.dao";
import { EntityAlreadyProcessed } from "src/domain/exceptions/ait.alreadyProcessed.error";

@Injectable()
export class UpdateAitUseCase implements IUpdateAitUseCase {
    constructor(
        @Inject('IAitRepository')
        private readonly repository: IAitRepository
    ){}

    async update(id: string, data: UpdateAitDto): Promise< UpdatedAitResponseDTO | Error> {
        const aitHasBeenPaid = await this.repository.findOne(id);

        if(aitHasBeenPaid instanceof EntityNotFoundError){
            return new EntityNotFoundError(aitHasBeenPaid.message);
        }

        if(aitHasBeenPaid instanceof ListAitsDAO){
            if(aitHasBeenPaid.status === 'PAGO'){
                return new EntityAlreadyProcessed('Não é possivel atualizar os dados de um AIT que já foi pago!');
            }
        }

        const ait = AitMapper.updatedToDomain(id, data);

        const updatedAit = await this.repository.update(id , ait);

        if(updatedAit instanceof Error){
            return new Error(`Erro inesperado ao atualizar AIT: ${updatedAit.message}`);
        }

        return updatedAit;

    }
}