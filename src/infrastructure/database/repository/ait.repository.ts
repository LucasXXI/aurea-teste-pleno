import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { IAitRepository } from "src/domain/interfaces/repository/sql/ait.repository.interface";
import { AitDAO } from "../prisma/daos/persisted-ait.dao";
import { ListAitsDAO } from "../prisma/daos/listed-ait.dao";
import { AitListMapper } from "../mappers/ait.list.mapper";
import { Prisma } from "@prisma/client";

@Injectable()
export class AitRepository implements IAitRepository {
    constructor
    (
        //@Inject('PrismaService')
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

            return {
                message: 'Ait criado com sucesso',
                data: {
                    id: ait.id,
                    status: ait.status,
                    createdAt: ait.created_at,
            }
        };

        } catch (error) {
            return Error(error.message);
        }
    }

    async findAll(): Promise<ListAitsDAO[] | Error> {
        try {
            const msgOut =  await this.prisma.ait.findMany({
                orderBy: { data_infracao: 'desc' }
            });

            if(msgOut.length === 0){
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