import { Injectable } from '@nestjs/common';
import { CreateLanguageTranslationEnDto } from './dto/create-languageTranslationEn.dto';
import { UpdateLanguageTranslationEnDto } from './dto/update-languageTranslationEn.dto';
import { PrismaService } from '../../prisma.service';
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@Injectable()
export class LanguageTranslationsEnService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorService: HttpErrorService,
    private readonly transformToQueryPrisma: TransformToQueryPrisma
  ) {}

  async create(createLanguageTranslationEnDto: CreateLanguageTranslationEnDto) {
    try {
      const newLanguageTranslationEn = await this.prismaService.languageTranslationsEn.create({ data: createLanguageTranslationEnDto });
      return newLanguageTranslationEn;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAll() {
    try {
      const languageTranslationsEn = await this.prismaService.languageTranslationsEn.findMany();
      return languageTranslationsEn;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAllByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const languageTranslationsEn = await this.prismaService.languageTranslationsEn.findMany(queryForPrisma);
      return languageTranslationsEn;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const languageTranslationEn = await this.prismaService.languageTranslationsEn.findFirst(queryForPrisma);
      return languageTranslationEn;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneById(id: number) {
    try {
      const languageTranslationEn = await this.prismaService.languageTranslationsEn.findUnique({ where: { id } });
      return languageTranslationEn;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async update(id: number, updateLanguageTranslationEnDto: UpdateLanguageTranslationEnDto) {
    try {
      const updatedLanguageTranslationEn = await this.prismaService.languageTranslationsEn.update({ where: { id }, data: updateLanguageTranslationEnDto });
      return updatedLanguageTranslationEn;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const deletedLanguageTranslationEn = await this.prismaService.languageTranslationsEn.delete({ where: { id } });
      return deletedLanguageTranslationEn;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }
}