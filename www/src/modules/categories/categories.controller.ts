import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { RequestByQueryParamsCategoryDto } from './dto/requestByQueryParams-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationQueryParamsPipe } from 'src/modules/http/decorators/validation-query-params.decorator';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('getAll')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsCategoryDto))
  findAllByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.categoriesService.findAllByQueryParams(queryParams);
  }

  @Get('getOne')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsCategoryDto))
  findOneByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.categoriesService.findOneByQueryParams(queryParams);
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}