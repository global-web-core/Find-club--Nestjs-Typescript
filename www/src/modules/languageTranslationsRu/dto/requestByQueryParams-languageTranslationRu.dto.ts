import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { CreateLanguageTranslationRuDto } from './create-languageTranslationRu.dto';

export class RequestByQueryParamsLanguageTranslationRuDto extends PartialType(CreateLanguageTranslationRuDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  id?: number;
}