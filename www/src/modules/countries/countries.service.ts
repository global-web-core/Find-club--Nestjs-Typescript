import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { PrismaService } from '../../prisma.service';
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@Injectable()
export class CountriesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorService: HttpErrorService,
    private readonly transformToQueryPrisma: TransformToQueryPrisma
  ) {}

  async create(createCountryDto: CreateCountryDto) {
    try {
      const newCountry = await this.prismaService.countries.create({ data: createCountryDto });
      return newCountry;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAll() {
    try {
      const countries = await this.prismaService.countries.findMany();
      return countries;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAllByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const countries = await this.prismaService.countries.findMany(queryForPrisma);
      return countries;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const country = await this.prismaService.countries.findFirst(queryForPrisma);
      return country;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneById(id: number) {
    try {
      const country = await this.prismaService.countries.findUnique({ where: { id } });
      return country;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    try {
      const updatedCountry = await this.prismaService.countries.update({ where: { id }, data: updateCountryDto });
      return updatedCountry;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const deletedCountry = await this.prismaService.countries.delete({ where: { id } });
      return deletedCountry;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }
}