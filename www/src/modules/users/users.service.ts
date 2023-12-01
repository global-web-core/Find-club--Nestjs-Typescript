import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma.service'
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';
import { v4 as uuid } from 'uuid';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@Injectable()
export class UsersService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly httpErrorService: HttpErrorService,
		private readonly transformToQueryPrisma: TransformToQueryPrisma
	) {}

  async create(createUserDto: CreateUserDto) {
		try {
			const id = uuid();
			const user = { ...createUserDto, id };
			const newUser = await this.prismaService.users.create({data: user});
			return newUser;
		} catch (error) {
			this.httpErrorService.handleError(error);
		}
  }

  async findAllByQueryParams(queryParams: HttpQueryParamsFromUrl) {
		try {
			const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams)
			const users = await this.prismaService.users.findMany(queryForPrisma);
			return users;
    } catch (error) {
			this.httpErrorService.handleError(error);
    }
  }

  async findOneByQueryParams(queryParams: HttpQueryParamsFromUrl) {
		try {
			const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams)
			const user = await this.prismaService.users.findFirst(queryForPrisma);
			return user;
    } catch (error) {
			this.httpErrorService.handleError(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
		try {
			const updatedUser = await this.prismaService.users.update({where: {id}, data: updateUserDto});
			return updatedUser;
		} catch (error) {
			this.httpErrorService.handleError(error);
		}
  }

  async remove(id: string) {
		try {
			const deletedUser = await this.prismaService.users.delete({where: {id}});
			return deletedUser;
		} catch (error) {
			this.httpErrorService.handleError(error);
		}
  }
}