import { Ait as PrismaAit, Status } from '@prisma/client';
import { ListAitsDAO } from '../../infrastructure/database/prisma/daos/lait.listed.dao';
import { StatusAit } from 'src/domain/enums/ait.status.enum';

export class AitListMapper {
  static toDAO(prismaAit: PrismaAit): ListAitsDAO {
    return new ListAitsDAO(
      prismaAit.id,
      prismaAit.placa_veiculo,
      prismaAit.data_infracao,
      prismaAit.descricao,
      prismaAit.valor_multa.toNumber(),
      prismaAit.status as StatusAit,
      prismaAit.created_at,
      prismaAit.data_processamento,
      prismaAit.updated_at,
    );
  }

  static toDAOList(prismaAits: PrismaAit[]): ListAitsDAO[] {
    return prismaAits.map((ait) => this.toDAO(ait));
  }
}
