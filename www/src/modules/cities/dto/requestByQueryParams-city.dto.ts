import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { CreateCityDto } from './create-city.dto';

export class RequestByQueryParamsCityDto extends PartialType(CreateCityDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  id?: number;
}