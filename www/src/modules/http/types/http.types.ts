import { ORDER_BY } from "src/constants/http.constants";
import { ConditionsQueryParamsDto, LimitsQueryParamsDto } from "../dto/http.dto";

export interface HttpQueryParams {
	conditionsQuery?: ConditionsQueryParamsDto[],
	limit?: LimitsQueryParamsDto
}

export interface HttpQueryParamsFromUrl {
	conditionsQuery?: string,
	limit?: string
}

type OrderBy = typeof ORDER_BY[keyof typeof ORDER_BY];

export type OrderByForPrisma = {[key: string]: OrderBy};