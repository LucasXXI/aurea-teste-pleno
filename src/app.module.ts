import { Module } from '@nestjs/common';
import { AitsModule } from './aits/aits.module';

@Module({
  imports: [AitsModule]
})
export class AppModule {}
