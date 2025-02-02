import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateAitDto {
  @ApiProperty({ example: 'ABC-1234', description: 'Placa do veículo' })
  @IsString()
  placaVeiculo: string;

  @ApiProperty({
    example: '2025-01-01T12:00:00Z',
    description: 'Data da infração',
  })
  @IsDateString()
  dataInfracao: Date;

  @ApiProperty({
    example: 'Estacionamento proibido',
    description: 'Descrição da infração',
  })
  @IsString()
  descricao: string;

  @ApiProperty({ example: 150.5, description: 'Valor da multa' })
  @IsNumber()
  valorMulta: number;
}
