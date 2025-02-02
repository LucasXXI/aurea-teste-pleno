import { UpdateAitDto } from 'src/application/dtos/requests/ait.update.dto';
import { UpdatedAitResponseDTO } from 'src/application/dtos/responses/ait.updated.response';

export interface IUpdateAitUseCase {
  update(
    id: string,
    data: UpdateAitDto,
  ): Promise<UpdatedAitResponseDTO | Error>;
}
