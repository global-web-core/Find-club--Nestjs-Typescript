import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { CreateCountryDto } from './create-country.dto';

export class RequestByQueryParamsCountryDto extends PartialType(CreateCountryDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  id?: number;
}