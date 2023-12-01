import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ParseIntPipe } from '@nestjs/common';
import { InterestsService } from './interests.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { RequestByQueryParamsInterestDto } from './dto/requestByQueryParams-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationQueryParamsPipe } from 'src/modules/http/decorators/validation-query-params.decorator';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@ApiTags('interests')
@Controller('interests')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  @Post()
  create(@Body() createInterestDto: CreateInterestDto) {
    return this.interestsService.create(createInterestDto);
  }

  @Get()
  findAll() {
    return this.interestsService.findAll();
  }

  @Get('getAll')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsInterestDto))
  findAllByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.interestsService.findAllByQueryParams(queryParams);
  }

  @Get('getOne')
  @UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsInterestDto))
  findOneByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {
    return this.interestsService.findOneByQueryParams(queryParams);
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.interestsService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateInterestDto: UpdateInterestDto) {
    return this.interestsService.update(id, updateInterestDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.interestsService.remove(id);
  }
}