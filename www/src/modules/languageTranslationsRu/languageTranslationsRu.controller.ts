import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ParseIntPipe } from '@nestjs/common';
import { LanguageTranslationsRuService } from './languageTranslationsRu.service';
import { CreateLanguageTranslationRuDto } from './dto/create-languageTranslationRu.dto';
import { RequestByQueryParamsLanguageTranslationRuDto } from './dto/requestByQueryParams-languageTranslationRu.dto';
import { UpdateLanguageTranslationRuDto } from './dto/update-languageTranslationRu.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationQueryParamsPipe } from 'src/modules/http/decorators/validation-query-params.decorator';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@ApiTags('languageTranslationsRu')
@Controller('languageTranslationsRu')
export class LanguageTranslationsRuController {
  constructor(private readonly languageTranslationsRuService: LanguageTranslationsRuService) {}

  @Post()
  create(@Body() createLanguageTranslationRuDto: CreateLanguageTranslationRuDto) {
    return this.languageTranslationsRuService.create(createLanguageTranslationRuDto);
  }

  @Get()
  findAll() {
    return this.languageTranslationsRuService.findAll();
  }

  @Get('getAll')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsLanguageTranslationRuDto))
  findAllByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.languageTranslationsRuService.findAllByQueryParams(queryParams);
  }

  @Get('getOne')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsLanguageTranslationRuDto))
  findOneByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.languageTranslationsRuService.findOneByQueryParams(queryParams);
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.languageTranslationsRuService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateLanguageTranslationRuDto: UpdateLanguageTranslationRuDto) {
    return this.languageTranslationsRuService.update(id, updateLanguageTranslationRuDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.languageTranslationsRuService.remove(id);
  }
}