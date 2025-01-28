import { Injectable } from "@nestjs/common";
import { IDeleteAitUseCase } from "src/domain/interfaces/useCases/aitDelete.useCase.interface";

@Injectable()
export class DeleteAitUseCase implements IDeleteAitUseCase {
    execute(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
}