import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ParseIntPipe } from '@nestjs/common';
import { LanguageTranslationsEnService } from './languageTranslationsEn.service';
import { CreateLanguageTranslationEnDto } from './dto/create-languageTranslationEn.dto';
import { RequestByQueryParamsLanguageTranslationEnDto } from './dto/requestByQueryParams-languageTranslationEn.dto';
import { UpdateLanguageTranslationEnDto } from './dto/update-languageTranslationEn.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationQueryParamsPipe } from 'src/modules/http/decorators/validation-query-params.decorator';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@ApiTags('languageTranslationsEn')
@Controller('languageTranslationsEn')
export class LanguageTranslationsEnController {
  constructor(private readonly languageTranslationsEnService: LanguageTranslationsEnService) {}

  @Post()
  create(@Body() createLanguageTranslationEnDto: CreateLanguageTranslationEnDto) {
    return this.languageTranslationsEnService.create(createLanguageTranslationEnDto);
  }

  @Get()
  findAll() {
    return this.languageTranslationsEnService.findAll();
  }

  @Get('getAll')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsLanguageTranslationEnDto))
  findAllByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.languageTranslationsEnService.findAllByQueryParams(queryParams);
  }

  @Get('getOne')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsLanguageTranslationEnDto))
  findOneByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.languageTranslationsEnService.findOneByQueryParams(queryParams);
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.languageTranslationsEnService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateLanguageTranslationEnDto: UpdateLanguageTranslationEnDto) {
    return this.languageTranslationsEnService.update(id, updateLanguageTranslationEnDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.languageTranslationsEnService.remove(id);
  }
}