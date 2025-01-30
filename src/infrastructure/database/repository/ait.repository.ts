import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { IAitRepository } from "src/domain/interfaces/repository/sql/ait.repository.interface";
import { AitDAO } from "../prisma/daos/ait.persisted.dao";
import { ListAitsDAO } from "../prisma/daos/lait.listed.dao";
import { AitListMapper } from "../../../application/mappers/ait.listed.mapper";
import { Prisma } from "@prisma/client";
import { CreatedAitMapper } from "src/application/mappers/ait.created.mapper";

@Injectable()
export class AitRepository implements IAitRepository {
    constructor
    (
        private prisma: PrismaService
    ) {}

    async create(data: AitDAO): Promise<any | Error> {
        try {
            const ait = await this.prisma.ait.create({
                data: {
                    id: data.id,
                    placa_veiculo: data.placaVeiculo,
                    data_infracao: data.dataInfracao,
                    descricao: data.descricao,
                    valor_multa: data.valorMulta
                }
            });

            return CreatedAitMapper.toDomain(ait);
            
        } catch (error) {
            return Error(error.message);
        }
    }

    async findAll(): Promise<ListAitsDAO[] | Error> {
        try {
            const msgOut =  await this.prisma.ait.findMany({
                orderBy: { data_infracao: 'desc' }
            });

            if(msgOut.length == 0){
                return Error('Nenhum ait encontrado');
            }
            return AitListMapper.toDAOList(msgOut);

        } catch (error) {
            return Error(error.message);
        }

    }

    async findOne(id: string): Promise<ListAitsDAO | Error> {
        try {
            const msgOut =  await this.prisma.ait.findUnique({
                where: {
                    id: id
                }
            });

            if(msgOut === null){
                return Error('Ait não encontrado');
            }

            return AitListMapper.toDAO(msgOut);
            
        } catch (error) {
            return Error(error.message);
        }
    }

    async update(id: string, data: any): Promise<any> {
        return await this.prisma.ait.update({
            where: {
                id: id
            },
            data: data
        });
    }

    async delete(id: string): Promise<boolean | Error>{
        try {
            await this.prisma.ait.delete({
                where: {
                    id: id
                }
            });
            return true;

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                return false
            }
            return Error(error.message);
        }
    }
}