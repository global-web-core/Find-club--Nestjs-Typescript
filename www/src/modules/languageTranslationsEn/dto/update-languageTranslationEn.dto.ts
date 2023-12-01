import { PartialType } from '@nestjs/mapped-types';
import { CreateLanguageTranslationEnDto } from './create-languageTranslationEn.dto';

export class UpdateLanguageTranslationEnDto extends PartialType(CreateLanguageTranslationEnDto) {}