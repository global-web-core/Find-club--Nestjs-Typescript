import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from '../../prisma.service'
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';
import { v4 as uuid } from 'uuid';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@Injectable()
export class AccountsService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly httpErrorService: HttpErrorService,
		private readonly transformToQueryPrisma: TransformToQueryPrisma
		) {}

  async create(createAccountDto: CreateAccountDto) {
		try {
			const id = uuid();
			const account = { ...createAccountDto, id };
			const newAccount = await this.prismaService.accounts.create({data: account});
			return newAccount;
		} catch (error) {
			this.httpErrorService.handleError(error);
		}
  }

  async findAllByQueryParams(queryParams: HttpQueryParamsFromUrl) {
		try {
			const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams)
			const accounts = await this.prismaService.accounts.findMany(queryForPrisma);
			return accounts;
    } catch (error) {
			this.httpErrorService.handleError(error);
    }
  }

  async findOneByQueryParams(queryParams: HttpQueryParamsFromUrl) {
		try {
			const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams)
			const account = await this.prismaService.accounts.findFirst(queryForPrisma);
			return account;
    } catch (error) {
			this.httpErrorService.handleError(error);
    }
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
		try {
			const updatedAccount = await this.prismaService.accounts.update({where: {id}, data: updateAccountDto});
			return updatedAccount;
		} catch (error) {
			this.httpErrorService.handleError(error);
		}
  }

  async remove(id: string) {
		try {
			const deletedAccount = await this.prismaService.accounts.delete({where: {id}});
			return deletedAccount;
		} catch (error) {
			this.httpErrorService.handleError(error);
		}
  }
}
