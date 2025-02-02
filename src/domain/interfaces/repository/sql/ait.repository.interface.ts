import { Ait } from 'src/domain/entities/ait.entity';
import { ListAitsDAO } from 'src/infrastructure/database/prisma/daos/lait.listed.dao';
import { AitDAO } from 'src/infrastructure/database/prisma/daos/ait.persisted.dao';
import { CreatedAitResponseDTO } from 'src/application/dtos/responses/ait.created.response';
import { UpdatedAitResponseDTO } from 'src/application/dtos/responses/ait.updated.response';

export interface IAitRepository {
  create(data: AitDAO): Promise<CreatedAitResponseDTO | Error>;
  findAll(): Promise<ListAitsDAO[] | Error>;
  findOne(id: string): Promise<ListAitsDAO | Error>;
  update(id: string, data: Ait): Promise<UpdatedAitResponseDTO | Error>;
  delete(id: string): Promise<boolean | Error>;
  processAits(): Promise<ListAitsDAO[] | Error>;
}
