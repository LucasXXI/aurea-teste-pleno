import { Injectable } from "@nestjs/common";
import { IAitService } from "../interfaces/ait.service.interface";
import { IRegisterAitUseCase } from "src/domain/interfaces/useCases/aitRegister.useCase.interface";
import { IUpdateAitUseCase } from "../../domain/interfaces/useCases/aitUpdate.useCase.interface";
import { IDeleteAitUseCase } from "../../domain/interfaces/useCases/aitDelete.useCase.interface";
import { IListAitsUseCase } from "../../domain/interfaces/useCases/aitList.useCase.interface";
import { IProcessAitUseCase } from "../../domain/interfaces/useCases/ait.processor.useCase.interface";


@Injectable()
export class AitService{

    constructor(
        private readonly registerAitUseCase: IRegisterAitUseCase,
        private readonly updateAitUseCase: IUpdateAitUseCase,
        private readonly deleteAitUseCase: IDeleteAitUseCase,
        private readonly listAitsUseCase: IListAitsUseCase,
        private readonly processAitUseCase: IProcessAitUseCase
    ) { }

    list(): Promise<any[]> {
        throw new Error("Method not implemented.");
        this.listAitsUseCase.execute();
    }
    listByFineId(fineId: string): Promise<any[]> {
        throw new Error("Method not implemented.");
        this.listAitsUseCase.executeByFineId(fineId);
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
        this.deleteAitUseCase.execute(id);
    }
    process(): Promise<any> {
        throw new Error("Method not implemented.");
        this.processAitUseCase.execute();
    }
    register(data: any): Promise<any> {
        throw new Error("Method not implemented.");
        this.registerAitUseCase.execute(data);
    }
    update(id: string, data: any): Promise<any> {
        throw new Error("Method not implemented.");
        this.updateAitUseCase.execute(id, data);
    }
}