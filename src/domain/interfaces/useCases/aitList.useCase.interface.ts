import { ListAitsDAO } from 'src/infrastructure/database/prisma/daos/lait.listed.dao';

export interface IListAitsUseCase {
  listAll(): Promise<ListAitsDAO[] | Error>;

  listByFineId(fineId: string): Promise<ListAitsDAO | Error>;
}
