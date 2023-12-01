import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { CreateDesireDto } from './create-desire.dto';

export class RequestByQueryParamsDesireDto extends PartialType(CreateDesireDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  id?: number;
}