import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

	async onModuleDestroy() {
    await this.$disconnect();
  }

  async checkConnection(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
			console.log('The connection to the database has been established.');
      return true;
    } catch (error) {
      console.error('Error when checking the connection to the database:', error);
      return false;
    }
  }
}