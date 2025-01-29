import { Inject, Injectable } from "@nestjs/common";
import { CreateAitDto } from "src/presentation/dto/create-ait.dto";
import { IAitRepository } from "src/domain/interfaces/repository/sql/ait.repository.interface";
import { IRegisterAitUseCase } from "src/domain/interfaces/useCases/aitRegister.useCase.interface";
import { AitMapper } from "../mappers/ait.mapper";
import { AitPersistMapper } from "../mappers/ait.persist.mapper";
import { error } from "console";

@Injectable()
export class registerAitUseCase implements IRegisterAitUseCase {
    constructor
    (
        @Inject('IAitRepository')
        private readonly repository: IAitRepository
    ) {}

    async register(data: CreateAitDto): Promise<any> {
        const ait = AitMapper.toDomain(data);

        var msgOut = await this.repository.create(AitPersistMapper.toPersistedAit(ait));

        if(msgOut instanceof Error){
            return msgOut;
        }

        return msgOut;
    }
}