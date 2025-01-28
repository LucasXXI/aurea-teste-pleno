import { Injectable } from "@nestjs/common";
import { IProcessAitUseCase } from "src/domain/interfaces/useCases/ait.processor.useCase.interface";

@Injectable()
export class ProcessAitUseCase implements IProcessAitUseCase {
    async execute(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}