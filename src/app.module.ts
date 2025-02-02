import { Module } from '@nestjs/common';
import { AitsModule } from './presentation/modules/aits.module';

@Module({
  imports: [AitsModule],
})
export class AppModule {}
