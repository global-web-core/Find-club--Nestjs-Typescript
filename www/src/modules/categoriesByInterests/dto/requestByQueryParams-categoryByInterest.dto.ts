import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { CreateCategoryByInterestDto } from './create-categoryByInterest.dto';

export class RequestByQueryParamsCategoryByInterestDto extends PartialType(CreateCategoryByInterestDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  id?: number;
}