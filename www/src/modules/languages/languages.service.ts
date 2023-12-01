import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { PrismaService } from '../../prisma.service';
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@Injectable()
export class LanguagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorService: HttpErrorService,
    private readonly transformToQueryPrisma: TransformToQueryPrisma
  ) {}

  async create(createLanguageDto: CreateLanguageDto) {
    try {
      const newLanguage = await this.prismaService.languages.create({ data: createLanguageDto });
      return newLanguage;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAll() {
    try {
      const languages = await this.prismaService.languages.findMany();
      return languages;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findAllByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const languages = await this.prismaService.languages.findMany(queryForPrisma);
      return languages;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneByQueryParams(queryParams: HttpQueryParamsFromUrl) {
    try {
      const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);
      const language = await this.prismaService.languages.findFirst(queryForPrisma);
      return language;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async findOneById(id: number) {
    try {
      const language = await this.prismaService.languages.findUnique({ where: { id } });
      return language;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    try {
      const updatedLanguage = await this.prismaService.languages.update({ where: { id }, data: updateLanguageDto });
      return updatedLanguage;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const deletedLanguage = await this.prismaService.languages.delete({ where: { id } });
      return deletedLanguage;
    } catch (error) {
      this.httpErrorService.handleError(error);
    }
  }
}