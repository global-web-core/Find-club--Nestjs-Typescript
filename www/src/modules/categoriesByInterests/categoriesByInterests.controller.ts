import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ParseIntPipe } from '@nestjs/common';
import { CategoriesByInterestsService } from './categoriesByInterests.service';
import { CreateCategoryByInterestDto } from './dto/create-categoryByInterest.dto';
import { RequestByQueryParamsCategoryByInterestDto } from './dto/requestByQueryParams-categoryByInterest.dto';
import { UpdateCategoryByInterestDto } from './dto/update-categoryByInterest.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationQueryParamsPipe } from 'src/modules/http/decorators/validation-query-params.decorator';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@ApiTags('categoriesByInterests')
@Controller('categoriesByInterests')
export class CategoriesByInterestsController {
  constructor(private readonly categoriesByInterestsService: CategoriesByInterestsService) {}

  @Post()
  create(@Body() createCategoryByInterestDto: CreateCategoryByInterestDto) {
    return this.categoriesByInterestsService.create(createCategoryByInterestDto);
  }

  @Get()
  findAll() {
    return this.categoriesByInterestsService.findAll();
  }

  @Get('getAll')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsCategoryByInterestDto))
  findAllByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.categoriesByInterestsService.findAllByQueryParams(queryParams);
  }

  @Get('getOne')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsCategoryByInterestDto))
  findOneByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.categoriesByInterestsService.findOneByQueryParams(queryParams);
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesByInterestsService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryByInterestDto: UpdateCategoryByInterestDto) {
    return this.categoriesByInterestsService.update(id, updateCategoryByInterestDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesByInterestsService.remove(id);
  }
}