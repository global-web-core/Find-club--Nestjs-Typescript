import { Module } from '@nestjs/common';
import { InterestsByCitiesService } from './interestsByCities.service';
import { InterestsByCitiesController } from './interestsByCities.controller';
import { PrismaService } from '../../prisma.service';
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';

@Module({
  controllers: [InterestsByCitiesController],
  providers: [InterestsByCitiesService, PrismaService, HttpErrorService, TransformToQueryPrisma],
})
export class InterestsByCitiesModule {}