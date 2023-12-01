import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ParseIntPipe } from '@nestjs/common';
import { CitiesByCountriesService } from './citiesByCountries.service';
import { CreateCityByCountryDto } from './dto/create-cityByCountry.dto';
import { RequestByQueryParamsCityByCountryDto } from './dto/requestByQueryParams-cityByCountry.dto';
import { UpdateCityByCountryDto } from './dto/update-cityByCountry.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationQueryParamsPipe } from 'src/modules/http/decorators/validation-query-params.decorator';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@ApiTags('citiesByCountries')
@Controller('citiesByCountries')
export class CitiesByCountriesController {
  constructor(private readonly citiesByCountriesService: CitiesByCountriesService) {}

  @Post()
  create(@Body() createCityByCountryDto: CreateCityByCountryDto) {
    return this.citiesByCountriesService.create(createCityByCountryDto);
  }

  @Get()
  findAll() {
    return this.citiesByCountriesService.findAll();
  }

  @Get('getAll')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsCityByCountryDto))
  findAllByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.citiesByCountriesService.findAllByQueryParams(queryParams);
  }

  @Get('getOne')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsCityByCountryDto))
  findOneByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.citiesByCountriesService.findOneByQueryParams(queryParams);
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.citiesByCountriesService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCityByCountryDto: UpdateCityByCountryDto) {
    return this.citiesByCountriesService.update(id, updateCityByCountryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.citiesByCountriesService.remove(id);
  }
}