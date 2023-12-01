import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { CreateInterestByCityDto } from './create-interestByCity.dto';

export class RequestByQueryParamsInterestByCityDto extends PartialType(CreateInterestByCityDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  id?: number;
}