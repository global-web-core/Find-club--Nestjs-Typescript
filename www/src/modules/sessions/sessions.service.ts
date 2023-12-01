import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PrismaService } from '../../prisma.service'
import { HttpErrorService } from 'src/modules/http/services/http-error.service';
import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';
import { v4 as uuid } from 'uuid';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@Injectable()
export class SessionsService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly httpErrorService: HttpErrorService,
		private readonly transformToQueryPrisma: TransformToQueryPrisma
	) {}

  async create(createSessionDto: CreateSessionDto) {
		try {
			const id = uuid();
			const session = { ...createSessionDto, id };
			const newSession = await this.prismaService.sessions.create({data: session});
			return newSession;
		} catch (error) {
			this.httpErrorService.handleError(error);
		}
  }

  async findAllByQueryParams(queryParams: HttpQueryParamsFromUrl) {
		try {
			const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams)
			const sessions = await this.prismaService.sessions.findMany(queryForPrisma);
			return sessions;
    } catch (error) {
			this.httpErrorService.handleError(error);
    }
  }

  async findOneByQueryParams(queryParams: HttpQueryParamsFromUrl) {
		try {
			const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams)
			const session = await this.prismaService.sessions.findFirst(queryForPrisma);
			return session;
    } catch (error) {
			this.httpErrorService.handleError(error);
    }
  }

  async update(id: string, updateSessionDto: UpdateSessionDto) {
		try {
			const updatedSession = await this.prismaService.sessions.update({where: {id}, data: updateSessionDto});
			return updatedSession;
		} catch (error) {
			this.httpErrorService.handleError(error);
		}
  }

  async remove(id: string) {
		try {
			const deletedSession = await this.prismaService.sessions.delete({where: {id}});
			return deletedSession;
		} catch (error) {
			this.httpErrorService.handleError(error);
		}
  }
}