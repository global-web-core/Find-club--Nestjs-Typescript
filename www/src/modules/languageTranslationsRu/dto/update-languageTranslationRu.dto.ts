import { PartialType } from '@nestjs/mapped-types';
import { CreateLanguageTranslationRuDto } from './create-languageTranslationRu.dto';

export class UpdateLanguageTranslationRuDto extends PartialType(CreateLanguageTranslationRuDto) {}