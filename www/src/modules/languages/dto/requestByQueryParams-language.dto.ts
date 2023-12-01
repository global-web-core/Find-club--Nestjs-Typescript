import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { CreateLanguageDto } from './create-language.dto';

export class RequestByQueryParamsLanguageDto extends PartialType(CreateLanguageDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  id?: number;
}