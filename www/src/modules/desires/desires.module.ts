import { Module } from '@nestjs/common';
import { DesiresService } from './desires.service';
import { DesiresController } from './desires.controller';
import { PrismaService } from '../../prisma.service';
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';

@Module({
  controllers: [DesiresController],
  providers: [DesiresService, PrismaService, HttpErrorService, TransformToQueryPrisma],
})
export class DesiresModule {}