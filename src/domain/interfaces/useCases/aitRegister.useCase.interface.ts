import { CreatedAitResponseDTO } from 'src/application/dtos/responses/ait.created.response';

export interface IRegisterAitUseCase {
  register(data: any): Promise<CreatedAitResponseDTO | Error>;
}
