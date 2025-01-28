import { Injectable } from "@nestjs/common";
import { IUpdateAitUseCase } from "src/domain/interfaces/useCases/aitUpdate.useCase.interface";

@Injectable()
export class UpdateAitUseCase implements IUpdateAitUseCase {
    async execute(id: string, data: string): Promise<any> {
        throw new Error("Method not implemented.");
        //return await this.repository.update(data);
    }
}