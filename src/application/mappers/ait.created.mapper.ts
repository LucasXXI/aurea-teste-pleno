import { CreatedAitResponseDTO } from '../dtos/responses/ait.created.response';
import { Ait as PrismaAit } from '@prisma/client';

export class CreatedAitMapper {
  static toDomain(prismaAit: PrismaAit): CreatedAitResponseDTO {
    return new CreatedAitResponseDTO(
      prismaAit.id,
      prismaAit.status,
      prismaAit.created_at,
    );
  }
}
