import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { CreateInterestDto } from './create-interest.dto';

export class RequestByQueryParamsInterestDto extends PartialType(CreateInterestDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  id?: number;
}