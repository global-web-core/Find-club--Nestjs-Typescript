import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ParseIntPipe } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { RequestByQueryParamsCountryDto } from './dto/requestByQueryParams-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationQueryParamsPipe } from 'src/modules/http/decorators/validation-query-params.decorator';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.create(createCountryDto);
  }

  @Get()
  findAll() {
    return this.countriesService.findAll();
  }

  @Get('getAll')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsCountryDto))
  findAllByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.countriesService.findAllByQueryParams(queryParams);
  }

  @Get('getOne')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsCountryDto))
  findOneByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.countriesService.findOneByQueryParams(queryParams);
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.countriesService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countriesService.update(id, updateCountryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.countriesService.remove(id);
  }
}