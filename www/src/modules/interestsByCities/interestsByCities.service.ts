import { Injectable } from '@nestjs/common';
import { CreateInterestByCityDto } from './dto/create-interestByCity.dto';
import { UpdateInterestByCityDto } from './dto/update-interestByCity.dto';
import { PrismaService } from '../../prisma.service';
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@Injectable()
export class InterestsByCitiesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorService: HttpErrorService,
    private readonly transformToQueryPrisma: TransformToQueryPrisma
  ) {}

  async create(createInterestByCityDto: CreateInterestByCityDto) {
    try {
      const newInterestByCity = await this.prismaService.interestsByCities.create({ data: createInterestByCityDto });
      return newInterestByCity;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAll() {
    try {
      const interestsByCities = await this.prismaService.interestsByCities.findMany();
      return interestsByCities;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAllByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const interestsByCities = await this.prismaService.interestsByCities.findMany(queryForPrisma);
      return interestsByCities;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const interestByCity = await this.prismaService.interestsByCities.findFirst(queryForPrisma);
      return interestByCity;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneById(id: number) {
    try {
      const interestByCity = await this.prismaService.interestsByCities.findUnique({ where: { id } });
      return interestByCity;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async update(id: number, updateInterestByCityDto: UpdateInterestByCityDto) {
    try {
      const updatedInterestByCity = await this.prismaService.interestsByCities.update({ where: { id }, data: updateInterestByCityDto });
      return updatedInterestByCity;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const deletedInterestByCity = await this.prismaService.interestsByCities.delete({ where: { id } });
      return deletedInterestByCity;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }
}