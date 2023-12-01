import { Module } from '@nestjs/common';
import { LanguageTranslationsEnService } from './languageTranslationsEn.service';
import { LanguageTranslationsEnController } from './languageTranslationsEn.controller';
import { PrismaService } from '../../prisma.service';
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';

@Module({
  controllers: [LanguageTranslationsEnController],
  providers: [LanguageTranslationsEnService, PrismaService, HttpErrorService, TransformToQueryPrisma],
})
export class LanguageTranslationsEnModule {}