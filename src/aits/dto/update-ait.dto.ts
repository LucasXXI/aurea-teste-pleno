import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAitDto } from './create-ait.dto';

export class UpdateAitDto extends PartialType(CreateAitDto) {
     @ApiProperty({ example: 'ABC-1234', description: 'Placa do veículo' })
     multaId: string;
}
