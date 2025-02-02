import { StatusAit } from 'src/domain/enums/ait.status.enum';

export class UpdatedAitResponseDTO {
  id: string;
  status: StatusAit;
  placa_veiculo: string;
  data_infracao: Date;
  descricao: string;
  valor_multa: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    status: StatusAit,
    placa_veiculo: string,
    data_infracao: Date,
    descricao: string,
    valor_multa: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.status = status;
    this.placa_veiculo = placa_veiculo;
    this.data_infracao = data_infracao;
    this.descricao = descricao;
    this.valor_multa = valor_multa;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
