import { Injectable } from '@nestjs/common';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { PrismaService } from '../../prisma.service';
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@Injectable()
export class InterestsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorService: HttpErrorService,
    private readonly transformToQueryPrisma: TransformToQueryPrisma
  ) {}

  async create(createInterestDto: CreateInterestDto) {
    try {
      const newInterest = await this.prismaService.interests.create({ data: createInterestDto });
      return newInterest;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAll() {
    try {
      const interests = await this.prismaService.interests.findMany();
      return interests;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAllByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const interests = await this.prismaService.interests.findMany(queryForPrisma);
      return interests;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const interest = await this.prismaService.interests.findFirst(queryForPrisma);
      return interest;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneById(id: number) {
    try {
      const interest = await this.prismaService.interests.findUnique({ where: { id } });
      return interest;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async update(id: number, updateInterestDto: UpdateInterestDto) {
    try {
      const updatedInterest = await this.prismaService.interests.update({ where: { id }, data: updateInterestDto });
      return updatedInterest;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const deletedInterest = await this.prismaService.interests.delete({ where: { id } });
      return deletedInterest;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }
}