import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { CreateLanguageTranslationEnDto } from './create-languageTranslationEn.dto';

export class RequestByQueryParamsLanguageTranslationEnDto extends PartialType(CreateLanguageTranslationEnDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  id?: number;
}