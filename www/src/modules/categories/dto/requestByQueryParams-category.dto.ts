import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class RequestByQueryParamsCategoryDto extends PartialType(CreateCategoryDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  id?: number;
}