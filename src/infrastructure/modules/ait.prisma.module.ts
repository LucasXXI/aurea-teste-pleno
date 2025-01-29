import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { AitRepository } from '../database/repository/ait.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
        provide: 'IAitRepository',
        useClass: AitRepository
    }
  ],
  exports: [PrismaService, 'IAitRepository'],
})
export class PrismaModule {}