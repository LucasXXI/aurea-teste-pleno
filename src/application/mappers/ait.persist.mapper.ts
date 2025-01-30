import { Ait } from "src/domain/entities/ait.entity";
import { AitDAO } from "src/infrastructure/database/prisma/daos/ait.persisted.dao";

export class AitPersistMapper {
    static toPersistedAit(ait: Ait) : AitDAO {
        return new AitDAO (
            ait.id,
            ait.placaVeiculo,
            ait.dataInfracao,
            ait.descricao,
            ait.valorMulta
        );
    }
}