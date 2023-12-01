import { Module } from '@nestjs/common';
import { VerificationtokensService } from './verificationtokens.service';
import { VerificationtokensController } from './verificationtokens.controller';
import { PrismaService } from '../../prisma.service'
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';

@Module({
  controllers: [VerificationtokensController],
  providers: [VerificationtokensService, PrismaService, HttpErrorService, TransformToQueryPrisma],
})
export class VerificationtokensModule {}
