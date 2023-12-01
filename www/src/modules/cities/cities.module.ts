import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { PrismaService } from '../../prisma.service';
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService, PrismaService, HttpErrorService, TransformToQueryPrisma],
})
export class CitiesModule {}