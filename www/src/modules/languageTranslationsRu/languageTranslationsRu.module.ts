import { Module } from '@nestjs/common';
import { LanguageTranslationsRuService } from './languageTranslationsRu.service';
import { LanguageTranslationsRuController } from './languageTranslationsRu.controller';
import { PrismaService } from '../../prisma.service';
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';

@Module({
  controllers: [LanguageTranslationsRuController],
  providers: [LanguageTranslationsRuService, PrismaService, HttpErrorService, TransformToQueryPrisma],
})
export class LanguageTranslationsRuModule {}