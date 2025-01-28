import { Module } from '@nestjs/common';
import { AitsService } from './aits.service';
import { AitsController } from './aits.controller';
import { registerAitUseCase } from 'src/application/useCases/ait.register.useCase';

@Module({
  controllers: [AitsController],
  providers: [
    AitsService,
    {
      provide: 'IRegisterAitUseCase',
      useClass: registerAitUseCase
    }
  ],
})
export class AitsModule {}
