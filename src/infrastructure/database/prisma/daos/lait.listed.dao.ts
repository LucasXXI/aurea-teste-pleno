import { StatusAit } from 'src/domain/enums/ait.status.enum';

export class ListAitsDAO {
  id: string;
  placaVeiculo: string;
  dataInfracao: Date;
  descricao: string;
  valorMulta: number;
  status: StatusAit;
  createdAt: Date;
  dataProcessamento: Date | null;
  updatedAt: Date | null;

  constructor(
    id: string,
    placaVeiculo: string,
    dataInfracao: Date,
    descricao: string,
    valorMulta: number,
    status: StatusAit,
    createdAt: Date,
    dataprocesamento: Date | null,
    updatedAt: Date | null,
  ) {
    this.id = id;
    this.placaVeiculo = placaVeiculo;
    this.dataInfracao = dataInfracao;
    this.descricao = descricao;
    this.valorMulta = valorMulta;
    this.status = status;
    this.createdAt = createdAt;
    this.dataProcessamento = dataprocesamento ?? null;
    this.updatedAt = updatedAt ?? null;
  }
}
