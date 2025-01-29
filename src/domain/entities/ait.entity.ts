import { randomUUID } from "node:crypto"

export class Ait {
    id: string
    placaVeiculo: string
    dataInfracao: Date
    descricao: string
    valorMulta: number

    constructor(
        placaVeiculo: string,
        dataInfracao: Date,
        descricao: string,
        valorMulta: number
    ) {
        this.id = randomUUID()
        this.placaVeiculo = placaVeiculo
        this.dataInfracao = dataInfracao
        this.descricao = descricao
        this.valorMulta = valorMulta
    }
}
