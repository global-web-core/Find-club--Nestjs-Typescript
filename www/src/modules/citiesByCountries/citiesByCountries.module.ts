import { Module } from '@nestjs/common';
import { CitiesByCountriesService } from './citiesByCountries.service';
import { CitiesByCountriesController } from './citiesByCountries.controller';
import { PrismaService } from '../../prisma.service';
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';

@Module({
  controllers: [CitiesByCountriesController],
  providers: [CitiesByCountriesService, PrismaService, HttpErrorService, TransformToQueryPrisma],
})
export class CitiesByCountriesModule {}