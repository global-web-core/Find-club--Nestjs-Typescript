import { Injectable } from '@nestjs/common';
import { CreateVerificationtokenDto } from './dto/create-verificationtoken.dto';
import { UpdateVerificationtokenDto } from './dto/update-verificationtoken.dto';
import { PrismaService } from '../../prisma.service'
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@Injectable()
export class VerificationtokensService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly httpErrorService: HttpErrorService,
		private readonly transformToQueryPrisma: TransformToQueryPrisma
	) {}

  async create(createVerificationtokenDto: CreateVerificationtokenDto) {
		try {
			const newVerificationtoken = await this.prismaService.verificationtokens.create({data: createVerificationtokenDto});
			return newVerificationtoken;
		} catch (error) {
			this.httpErrorService.handleError(error);
		}
  }

  async findAllByQueryParams(queryParams: HttpQueryParamsFromUrl) {
		try {
			const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams)
			const verificationtokens = await this.prismaService.verificationtokens.findMany(queryForPrisma);
			return verificationtokens;
    } catch (error) {
			this.httpErrorService.handleError(error);
    }
  }

  async findOneByQueryParams(queryParams: HttpQueryParamsFromUrl) {
		try {
			const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams)
			const verificationtoken = await this.prismaService.verificationtokens.findFirst(queryForPrisma);
			return verificationtoken;
    } catch (error) {
			this.httpErrorService.handleError(error);
    }
  }

  async update(identifier: string, updateVerificationtokenDto: UpdateVerificationtokenDto) {
		try {
			const updatedVerificationtoken = await this.prismaService.verificationtokens.update({where: {identifier}, data: updateVerificationtokenDto});
			return updatedVerificationtoken;
		} catch (error) {
			this.httpErrorService.handleError(error);
		}
  }

  async remove(identifier: string) {
		try {
			const deletedVerificationtoken = await this.prismaService.verificationtokens.delete({where: {identifier}});
			return deletedVerificationtoken;
		} catch (error) {
			this.httpErrorService.handleError(error);
		}
  }
}