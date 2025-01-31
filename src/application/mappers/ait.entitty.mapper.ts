import { Ait } from '../../domain/entities/ait.entity';
import { CreateAitDto } from 'src/application/dtos/requests/ait.create.dto';
import { UpdateAitDto } from '../dtos/requests/ait.update.dto';
import { randomUUID } from "node:crypto"


export class AitMapper {
    static toDomain(createAitDto: CreateAitDto) : Ait {
        const ait = new Ait()
        ait.id = randomUUID()
        ait.placaVeiculo = createAitDto.placaVeiculo
        ait.dataInfracao = createAitDto.dataInfracao
        ait.descricao = createAitDto.descricao
        ait.valorMulta = createAitDto.valorMulta

        return ait
    }

    static updatedToDomain(id: string, aitToUpdate: UpdateAitDto) : Ait {
        const ait =  new Ait();
        ait.dataInfracao = aitToUpdate.dataInfracao;
        ait.descricao = aitToUpdate.descricao;
        ait.placaVeiculo = aitToUpdate.placaVeiculo;
        ait.valorMulta = aitToUpdate.valorMulta;
        ait.id = id;

        return ait;
    }
}