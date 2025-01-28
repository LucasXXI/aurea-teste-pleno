import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { IAitRepository } from "src/domain/interfaces/repository/sql/ait.repository.interface";
import { Ait } from "src/domain/entities/ait.entity";
import { PersistedAit } from "../prisma/daos/persisted-ait.dao";
import { StatusAit } from "src/domain/enums/ait.status.enum";

@Injectable()
export class AitRepository implements IAitRepository {
    constructor(private prisma: PrismaService) {}

    async create(data: Ait): Promise<any> {
        const ait = await this.prisma.ait.create({
            data: {
                placa_veiculo: data.placaVeiculo,
                data_infracao: data.dataInfracao,
                descricao: data.descricao,
                valor_multa: data.valorMulta
            }
        });

        return new PersistedAit(
            data,
            ait.id,
            ait.status as StatusAit,
            ait.created_at,
            ait.updated_at,
            ait.data_processamento ?? undefined
        )
    }

    async findAll(): Promise<any[]> {
        return await this.prisma.ait.findMany();
    }

    async findOne(id: string): Promise<any> {
        return await this.prisma.ait.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, data: any): Promise<any> {
        return await this.prisma.ait.update({
            where: {
                id: id
            },
            data: data
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.ait.delete({
            where: {
                id: id
            }
        });
    }
}