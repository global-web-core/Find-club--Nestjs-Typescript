import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ParseIntPipe } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { RequestByQueryParamsCityDto } from './dto/requestByQueryParams-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationQueryParamsPipe } from 'src/modules/http/decorators/validation-query-params.decorator';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  findAll() {
    return this.citiesService.findAll();
  }

  @Get('getAll')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsCityDto))
  findAllByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.citiesService.findAllByQueryParams(queryParams);
  }

  @Get('getOne')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsCityDto))
  findOneByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.citiesService.findOneByQueryParams(queryParams);
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.citiesService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCityDto: UpdateCityDto) {
    return this.citiesService.update(id, updateCityDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.citiesService.remove(id);
  }
}