import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ParseIntPipe } from '@nestjs/common';
import { InterestsByCitiesService } from './interestsByCities.service';
import { CreateInterestByCityDto } from './dto/create-interestByCity.dto';
import { RequestByQueryParamsInterestByCityDto } from './dto/requestByQueryParams-interestByCity.dto';
import { UpdateInterestByCityDto } from './dto/update-interestByCity.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationQueryParamsPipe } from 'src/modules/http/decorators/validation-query-params.decorator';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@ApiTags('interestsByCities')
@Controller('interestsByCities')
export class InterestsByCitiesController {
  constructor(private readonly interestsByCitiesService: InterestsByCitiesService) {}

  @Post()
  create(@Body() createInterestByCityDto: CreateInterestByCityDto) {
    return this.interestsByCitiesService.create(createInterestByCityDto);
  }

  @Get()
  findAll() {
    return this.interestsByCitiesService.findAll();
  }

  @Get('getAll')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsInterestByCityDto))
  findAllByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.interestsByCitiesService.findAllByQueryParams(queryParams);
  }

  @Get('getOne')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsInterestByCityDto))
  findOneByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.interestsByCitiesService.findOneByQueryParams(queryParams);
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.interestsByCitiesService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateInterestByCityDto: UpdateInterestByCityDto) {
    return this.interestsByCitiesService.update(id, updateInterestByCityDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.interestsByCitiesService.remove(id);
  }
}