import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ParseIntPipe } from '@nestjs/common';
import { DesiresService } from './desires.service';
import { CreateDesireDto } from './dto/create-desire.dto';
import { RequestByQueryParamsDesireDto } from './dto/requestByQueryParams-desire.dto';
import { UpdateDesireDto } from './dto/update-desire.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationQueryParamsPipe } from 'src/modules/http/decorators/validation-query-params.decorator';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@ApiTags('desires')
@Controller('desires')
export class DesiresController {
  constructor(private readonly desiresService: DesiresService) {}

  @Post()
  create(@Body() createDesireDto: CreateDesireDto) {
    return this.desiresService.create(createDesireDto);
  }

  @Get()
  findAll() {
    return this.desiresService.findAll();
  }

  @Get('getAll')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsDesireDto))
  findAllByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.desiresService.findAllByQueryParams(queryParams);
  }

  @Get('getOne')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsDesireDto))
  findOneByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.desiresService.findOneByQueryParams(queryParams);
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.desiresService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDesireDto: UpdateDesireDto) {
    return this.desiresService.update(id, updateDesireDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.desiresService.remove(id);
  }
}