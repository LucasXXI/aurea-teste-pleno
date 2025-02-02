import { Ait as PrismaAit } from '@prisma/client';
import { UpdatedAitResponseDTO } from '../dtos/responses/ait.updated.response';
import { StatusAit } from 'src/domain/enums/ait.status.enum';

export class UpdatedAitMapper {
  static toDomain(prismaAit: PrismaAit): UpdatedAitResponseDTO {
    return new UpdatedAitResponseDTO(
      prismaAit.id,
      prismaAit.status as StatusAit,
      prismaAit.placa_veiculo,
      prismaAit.data_infracao,
      prismaAit.descricao,
      prismaAit.valor_multa.toNumber(),
      prismaAit.created_at,
      prismaAit.updated_at,
    );
  }
}
