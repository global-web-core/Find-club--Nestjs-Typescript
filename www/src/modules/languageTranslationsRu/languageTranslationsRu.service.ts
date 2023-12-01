import { Injectable } from '@nestjs/common';
import { CreateLanguageTranslationRuDto } from './dto/create-languageTranslationRu.dto';
import { UpdateLanguageTranslationRuDto } from './dto/update-languageTranslationRu.dto';
import { PrismaService } from '../../prisma.service';
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@Injectable()
export class LanguageTranslationsRuService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorService: HttpErrorService,
    private readonly transformToQueryPrisma: TransformToQueryPrisma
  ) {}

  async create(createLanguageTranslationRuDto: CreateLanguageTranslationRuDto) {
    try {
      const newLanguageTranslationRu = await this.prismaService.languageTranslationsRu.create({ data: createLanguageTranslationRuDto });
      return newLanguageTranslationRu;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAll() {
    try {
      const languageTranslationsRu = await this.prismaService.languageTranslationsRu.findMany();
      return languageTranslationsRu;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAllByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const languageTranslationsRu = await this.prismaService.languageTranslationsRu.findMany(queryForPrisma);
      return languageTranslationsRu;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const languageTranslationRu = await this.prismaService.languageTranslationsRu.findFirst(queryForPrisma);
      return languageTranslationRu;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneById(id: number) {
    try {
      const languageTranslationRu = await this.prismaService.languageTranslationsRu.findUnique({ where: { id } });
      return languageTranslationRu;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async update(id: number, updateLanguageTranslationRuDto: UpdateLanguageTranslationRuDto) {
    try {
      const updatedLanguageTranslationRu = await this.prismaService.languageTranslationsRu.update({ where: { id }, data: updateLanguageTranslationRuDto });
      return updatedLanguageTranslationRu;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const deletedLanguageTranslationRu = await this.prismaService.languageTranslationsRu.delete({ where: { id } });
      return deletedLanguageTranslationRu;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }
}