import { Ait } from '../../domain/entities/ait.entity';
import { CreateAitDto } from 'src/presentation/dto/create-ait.dto';

export class AitMapper {
    static toDomain(createAitDto: CreateAitDto) : Ait {
        return new Ait(
            createAitDto.placaVeiculo,
            createAitDto.dataInfracao,
            createAitDto.descricao,
            createAitDto.valorMulta
        );
    }
}