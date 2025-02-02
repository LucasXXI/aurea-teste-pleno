import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    console.log('PrismaService iniciado...');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('PrismaService foi finalizado!');
  }
}
