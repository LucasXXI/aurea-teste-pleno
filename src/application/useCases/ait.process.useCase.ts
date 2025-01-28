import { Injectable } from "@nestjs/common";
import { IProcessAitUseCase } from "src/domain/interfaces/useCases/ait.processor.useCase.interface";

@Injectable()
export class ProcessAitUseCase implements IProcessAitUseCase {
    async processAllFines(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}