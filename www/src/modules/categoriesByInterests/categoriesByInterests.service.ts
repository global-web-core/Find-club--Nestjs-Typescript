import { Injectable } from '@nestjs/common';
import { CreateCategoryByInterestDto } from './dto/create-categoryByInterest.dto';
import { UpdateCategoryByInterestDto } from './dto/update-categoryByInterest.dto';
import { PrismaService } from '../../prisma.service';
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@Injectable()
export class CategoriesByInterestsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorService: HttpErrorService,
    private readonly transformToQueryPrisma: TransformToQueryPrisma
  ) {}

  async create(createCategoryByInterestDto: CreateCategoryByInterestDto) {
    try {
      const newCategoryByInterest = await this.prismaService.categoriesByInterests.create({ data: createCategoryByInterestDto });
      return newCategoryByInterest;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAll() {
    try {
      const categoriesByInterests = await this.prismaService.categoriesByInterests.findMany();
      return categoriesByInterests;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAllByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const categoriesByInterests = await this.prismaService.categoriesByInterests.findMany(queryForPrisma);
      return categoriesByInterests;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const categoryByInterest = await this.prismaService.categoriesByInterests.findFirst(queryForPrisma);
      return categoryByInterest;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneById(id: number) {
    try {
      const categoryByInterest = await this.prismaService.categoriesByInterests.findUnique({ where: { id } });
      return categoryByInterest;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async update(id: number, updateCategoryByInterestDto: UpdateCategoryByInterestDto) {
    try {
      const updatedCategoryByInterest = await this.prismaService.categoriesByInterests.update({ where: { id }, data: updateCategoryByInterestDto });
      return updatedCategoryByInterest;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const deletedCategoryByInterest = await this.prismaService.categoriesByInterests.delete({ where: { id } });
      return deletedCategoryByInterest;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }
}