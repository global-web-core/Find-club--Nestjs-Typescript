import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PrismaService } from '../../prisma.service';
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@Injectable()
export class CitiesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorService: HttpErrorService,
    private readonly transformToQueryPrisma: TransformToQueryPrisma
  ) {}

  async create(createCityDto: CreateCityDto) {
    try {
      const newCity = await this.prismaService.cities.create({ data: createCityDto });
      return newCity;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAll() {
    try {
      const cities = await this.prismaService.cities.findMany();
      return cities;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAllByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const cities = await this.prismaService.cities.findMany(queryForPrisma);
      return cities;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const city = await this.prismaService.cities.findFirst(queryForPrisma);
      return city;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneById(id: number) {
    try {
      const city = await this.prismaService.cities.findUnique({ where: { id } });
      return city;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    try {
      const updatedCity = await this.prismaService.cities.update({ where: { id }, data: updateCityDto });
      return updatedCity;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const deletedCity = await this.prismaService.cities.delete({ where: { id } });
      return deletedCity;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }
}