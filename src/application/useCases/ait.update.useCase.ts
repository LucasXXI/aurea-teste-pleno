import { Inject, Injectable } from "@nestjs/common";
import { IUpdateAitUseCase } from "src/domain/interfaces/useCases/aitUpdate.useCase.interface";
import { UpdateAitDto } from "../dtos/requests/ait.update.dto";
import { UpdatedAitResponseDTO } from "../dtos/responses/ait.updated.response";
import { IAitRepository } from "src/domain/interfaces/repository/sql/ait.repository.interface";
import { AitMapper } from "../mappers/ait.entitty.mapper";
import { EntityNotFoundError } from "src/domain/exceptions/ait.notFound.error";

@Injectable()
export class UpdateAitUseCase implements IUpdateAitUseCase {
    constructor(
        @Inject('IAitRepository')
        private readonly repository: IAitRepository
    ){}

    async update(id: string, data: UpdateAitDto): Promise< UpdatedAitResponseDTO | Error> {
        const ait = AitMapper.updatedToDomain(id, data);

        const updatedAit = await this.repository.update(id , ait);

        if(updatedAit instanceof EntityNotFoundError){
            return new EntityNotFoundError(updatedAit.message);
        }

        if(updatedAit instanceof Error){
            return new Error(`Erro inesperado ao atualizar AIT: ${updatedAit.message}`);
        }

        return updatedAit;

    }
}