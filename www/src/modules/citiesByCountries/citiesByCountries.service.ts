import { Injectable } from '@nestjs/common';
import { CreateCityByCountryDto } from './dto/create-cityByCountry.dto';
import { UpdateCityByCountryDto } from './dto/update-cityByCountry.dto';
import { PrismaService } from '../../prisma.service';
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@Injectable()
export class CitiesByCountriesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorService: HttpErrorService,
    private readonly transformToQueryPrisma: TransformToQueryPrisma
  ) {}

  async create(createCityByCountryDto: CreateCityByCountryDto) {
    try {
      const newCityByCountry = await this.prismaService.citiesByCountries.create({ data: createCityByCountryDto });
      return newCityByCountry;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAll() {
    try {
      const citiesByCountries = await this.prismaService.citiesByCountries.findMany();
      return citiesByCountries;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAllByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const citiesByCountries = await this.prismaService.citiesByCountries.findMany(queryForPrisma);
      return citiesByCountries;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const cityByCountry = await this.prismaService.citiesByCountries.findFirst(queryForPrisma);
      return cityByCountry;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneById(id: number) {
    try {
      const cityByCountry = await this.prismaService.citiesByCountries.findUnique({ where: { id } });
      return cityByCountry;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async update(id: number, updateCityByCountryDto: UpdateCityByCountryDto) {
    try {
      const updatedCityByCountry = await this.prismaService.citiesByCountries.update({ where: { id }, data: updateCityByCountryDto });
      return updatedCityByCountry;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const deletedCityByCountry = await this.prismaService.citiesByCountries.delete({ where: { id } });
      return deletedCityByCountry;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }
}