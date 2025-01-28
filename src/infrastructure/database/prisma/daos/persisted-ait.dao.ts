import { Ait } from "src/domain/entities/ait.entity";
import { StatusAit } from "src/domain/enums/ait.status.enum";

export class PersistedAit extends Ait {
    ait: Ait
    id: string
    status: StatusAit;
    createdAt: Date;
    updatedAt: Date;
    dataProcessamento?: Date;

    constructor(
        ait: Ait,
        id: string,
        status: StatusAit,
        createdAt: Date,
        updatedAt: Date,
        dataProcessamento?: Date
    ) {
        super()
        this.id = id
        this.status = status
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.dataProcessamento = dataProcessamento
    }
}