import { Ait } from "src/domain/entities/ait.entity";

export interface IAitRepository {
    create(data: Ait): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, data: Ait): Promise<any>;
    delete(id: string): Promise<void>;
  }