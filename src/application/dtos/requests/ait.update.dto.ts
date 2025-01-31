import { ApiProperty } from '@nestjs/swagger';

export class UpdateAitDto {
     @ApiProperty({ example: 'ABC-1234', description: 'Placa do veículo' })
     placaVeiculo: string;
 
     @ApiProperty({ example: '2025-01-01T12:00:00Z', description: 'Data da infração' })
     dataInfracao: Date;
 
     @ApiProperty({ example: 'Estacionamento proibido', description: 'Descrição da infração' })
     descricao: string;
 
     @ApiProperty({ example: 150.5, description: 'Valor da multa' })
     valorMulta: number;
}
