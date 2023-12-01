import { Module } from '@nestjs/common';
import { CategoriesByInterestsService } from './categoriesByInterests.service';
import { CategoriesByInterestsController } from './categoriesByInterests.controller';
import { PrismaService } from '../../prisma.service';
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';

@Module({
  controllers: [CategoriesByInterestsController],
  providers: [CategoriesByInterestsService, PrismaService, HttpErrorService, TransformToQueryPrisma],
})
export class CategoriesByInterestsModule {}