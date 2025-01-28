import { Injectable } from "@nestjs/common";
import { IRegisterAitUseCase } from "src/domain/interfaces/useCases/aitRegister.useCase.interface";

@Injectable()
export class registerAitUseCase implements IRegisterAitUseCase {
    // constructor(private readonly repository: IAitRepository) { }

    async register(data: any): Promise<any> {
        return 'cheguei'
        //return await this.repository.register(data);
    }
}