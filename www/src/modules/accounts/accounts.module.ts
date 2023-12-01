import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { PrismaService } from '../../prisma.service'
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, PrismaService, HttpErrorService, TransformToQueryPrisma],
})
export class AccountsModule {}
