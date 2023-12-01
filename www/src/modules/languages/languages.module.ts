import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { PrismaService } from '../../prisma.service';
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';

@Module({
  controllers: [LanguagesController],
  providers: [LanguagesService, PrismaService, HttpErrorService, TransformToQueryPrisma],
})
export class LanguagesModule {}