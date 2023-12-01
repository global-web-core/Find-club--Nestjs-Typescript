import { Injectable } from '@nestjs/common';
import { CreateDesireDto } from './dto/create-desire.dto';
import { UpdateDesireDto } from './dto/update-desire.dto';
import { PrismaService } from '../../prisma.service';
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@Injectable()
export class DesiresService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorService: HttpErrorService,
    private readonly transformToQueryPrisma: TransformToQueryPrisma
  ) {}

  async create(createDesireDto: CreateDesireDto) {
    try {
      const newDesire = await this.prismaService.desires.create({ data: createDesireDto });
      return newDesire;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAll() {
    try {
      const desires = await this.prismaService.desires.findMany();
      return desires;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAllByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const desires = await this.prismaService.desires.findMany(queryForPrisma);
      return desires;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const desire = await this.prismaService.desires.findFirst(queryForPrisma);
      return desire;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneById(id: number) {
    try {
      const desire = await this.prismaService.desires.findUnique({ where: { id } });
      return desire;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async update(id: number, updateDesireDto: UpdateDesireDto) {
    try {
      const updatedDesire = await this.prismaService.desires.update({ where: { id }, data: updateDesireDto });
      return updatedDesire;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const deletedDesire = await this.prismaService.desires.delete({ where: { id } });
      return deletedDesire;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }
}