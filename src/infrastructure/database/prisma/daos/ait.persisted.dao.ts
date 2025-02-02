export class AitDAO {
  id: string;
  placaVeiculo: string;
  dataInfracao: Date;
  descricao: string;
  valorMulta: number;

  constructor(
    id: string,
    placaVeiculo: string,
    dataInfracao: Date,
    descricao: string,
    valorMulta: number,
  ) {
    this.id = id;
    this.placaVeiculo = placaVeiculo;
    this.dataInfracao = dataInfracao;
    this.descricao = descricao;
    this.valorMulta = valorMulta;
  }
}
