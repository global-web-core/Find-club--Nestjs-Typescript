import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ORDER_BY, QUERY_CONDITIONS } from "src/constants/http.constants";

export class LimitsQueryParamsDto {
	@IsOptional()
	@IsNotEmpty()
  @IsInt()
  limit?: number;

	@IsOptional()
	@IsNotEmpty()
  @IsInt()
  offset?: number;
}

export class ConditionsQueryParamsDto {
	@IsNotEmpty()
  @IsString()
  column: string;

  @IsNotEmpty()
  value: unknown;

  @IsOptional()
	@IsNotEmpty()
  @IsIn(Object.values(QUERY_CONDITIONS))
  condition?: string;

  @IsOptional()
	@IsNotEmpty()
  @IsIn(Object.values(ORDER_BY))
  orderBy?: string;
}