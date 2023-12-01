import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { CreateCityByCountryDto } from './create-cityByCountry.dto';

export class RequestByQueryParamsCityByCountryDto extends PartialType(CreateCityByCountryDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  id?: number;
}