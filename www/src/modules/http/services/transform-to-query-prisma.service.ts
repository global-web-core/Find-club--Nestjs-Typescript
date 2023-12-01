// error-handling.service.ts
import { Injectable } from '@nestjs/common';
import { HttpQueryParams, HttpQueryParamsFromUrl, OrderByForPrisma } from '../types/http.types';
import { ORDER_BY, QUERY_CONDITIONS, QUERY_PARAMETERS } from 'src/constants/http.constants';

interface QueryForPrisma {
  where?: {[key: string]: any};
  orderBy?: OrderByForPrisma[];
  take?: number;
  skip?: number;
}

@Injectable()
export class TransformToQueryPrisma {
  public fromQueryParams(queryParams: HttpQueryParamsFromUrl) {
		const queryForPrisma: QueryForPrisma = {};
		if (queryParams?.conditionsQuery) {
			const parsedConditions: HttpQueryParams[typeof QUERY_PARAMETERS.CONDITIONS_QUERY] = JSON.parse(decodeURIComponent(queryParams.conditionsQuery));

			if (parsedConditions) {
				queryForPrisma.where = {};
				queryForPrisma.orderBy = [];
	
				parsedConditions.forEach(condition => {
					// condition < > <= >= = <>
					if (!queryForPrisma.where![condition.column]) queryForPrisma.where![condition.column] = {};
	
					if (condition.condition === QUERY_CONDITIONS.LESS) {
						queryForPrisma.where![condition.column].lt = condition.value;
					} else if (condition.condition === QUERY_CONDITIONS.LESS_OR_EQUAL) {
						queryForPrisma.where![condition.column].lte = condition.value;
					} else if (condition.condition === QUERY_CONDITIONS.GREATER) {
						queryForPrisma.where![condition.column].gt = condition.value;
					} else if (condition.condition === QUERY_CONDITIONS.GREATER_OR_EQUAL) {
						queryForPrisma.where![condition.column].gte = condition.value;
					} else if (condition.condition === QUERY_CONDITIONS.EQUAL) {
						queryForPrisma.where![condition.column].equals = condition.value;
					} else if (condition.condition === QUERY_CONDITIONS.NOT_EQUAL) {
						queryForPrisma.where![condition.column].not = condition.value;
					} else {
						queryForPrisma.where![condition.column] = condition.value;
					}
	
					// orderBy ASC, DESC
					if (condition.orderBy === ORDER_BY.ASC) {
						queryForPrisma.orderBy!.push({[condition.column]: ORDER_BY.ASC});
					} else if (condition.orderBy === ORDER_BY.DESC) {
						queryForPrisma.orderBy!.push({[condition.column]: ORDER_BY.DESC});
					}
				});
			}
		}

		// limit and offset
		if (queryParams?.limit) {
			const parsedLimit: HttpQueryParams[typeof QUERY_PARAMETERS.LIMIT] = JSON.parse(queryParams.limit);
			if (parsedLimit?.limit && Number.isInteger(parsedLimit?.limit)) queryForPrisma.take = parsedLimit.limit;
			if (parsedLimit?.offset && Number.isInteger(parsedLimit?.offset)) queryForPrisma.skip = parsedLimit.offset;
		}
		
		return queryForPrisma;
  }

	public fromQueryParamsForCount(queryParams: HttpQueryParamsFromUrl) {
		const countQuery = this.fromQueryParams(queryParams);
		delete countQuery.take;
    delete countQuery.skip;
    delete countQuery.orderBy;

    return countQuery;
	}
}
