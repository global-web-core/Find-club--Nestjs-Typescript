import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { BadRequestException, Injectable, PipeTransform, Type } from '@nestjs/common';
import { ERROR } from 'src/constants/response.constants';
import { ADDITIONAL_TEXT, QUERY_PARAMETERS } from 'src/constants/http.constants';
import { formatObjectToObjectString } from '../helpers/common.helpers';
import { ConditionsQueryParamsDto, LimitsQueryParamsDto } from '../dto/http.dto';
import { HttpQueryParamsFromUrl } from '../types/http.types';

@Injectable()
export class ValidationQueryParamsPipe <DtoType extends object> implements PipeTransform {
	constructor(private readonly dtoFromModuleForQueryParams: Type<DtoType>) {}

	private async validateByDto(object: object): Promise<ValidationError[]> {
		return validate(object, { whitelist: true, forbidNonWhitelisted: true });
	}

	private invalidJsonError(objectName: string) {
    return ERROR.INVALID_JSON_FORMAT + ' - ' + objectName;
  }

	private getTextErrorsFromValidationByDto (errors: ValidationError[]) {
		let errorAlert = ERROR.SOMETHING_WENT_WRONG;
		if (errors.length > 0) {
			const errorMessage = errors.map(error => {
				const targetStr = error?.target ? formatObjectToObjectString(error.target) : '';
				const constraintsStr = error?.constraints ? formatObjectToObjectString(error.constraints) : '';
				return `${ADDITIONAL_TEXT.YOU_REQUEST} - ${targetStr}. ${ADDITIONAL_TEXT.CATCH_ERROR} - ${constraintsStr}.`;
			}).join(', ');
			errorAlert = ERROR.VALIDATION_ERROR_AT + ' - ' + QUERY_PARAMETERS.CONDITIONS_QUERY + ': ' + errorMessage;
		}
		return errorAlert;
	}

	private getTextErrorNonExistentKeyInObject (object: object, key: string) {
		return `${ADDITIONAL_TEXT.YOU_REQUEST} - ${formatObjectToObjectString(object)}. ${ADDITIONAL_TEXT.CATCH_ERROR} - ${ERROR.UNKNOW_KEY} ${key}.`
	}

	private async validationQueryParamsByControllerDto (queryParams: HttpQueryParamsFromUrl) {
		let errorAlert: string | null = null;

		if (queryParams?.conditionsQuery) {
			let conditionsQuery: ConditionsQueryParamsDto[] | null;
			try {
				conditionsQuery = JSON.parse(queryParams?.conditionsQuery)
			} catch {
				errorAlert = this.invalidJsonError(QUERY_PARAMETERS.CONDITIONS_QUERY);
				return errorAlert;
			}
			if (!conditionsQuery) return this.invalidJsonError(QUERY_PARAMETERS.CONDITIONS_QUERY)

			const transformedConditions = conditionsQuery.reduce<Record<string, unknown>[]>((accumulatedConditions, currentQueryItem) => {
				const indexOfExistingCondition = accumulatedConditions.findIndex(conditionObject => conditionObject.hasOwnProperty(currentQueryItem.column));
		
				const newConditionObject: Record<string, unknown> = {};
				newConditionObject[currentQueryItem.column] = currentQueryItem.value;
		
				if (indexOfExistingCondition === -1) {
					accumulatedConditions.push(newConditionObject);
				} else {
					accumulatedConditions.push(newConditionObject);
				}
		
				return accumulatedConditions;
			}, []);

			const allErrors: ValidationError[] = [];
			for (const condition of transformedConditions) {
				const errors = await this.validateByDto(plainToInstance(this.dtoFromModuleForQueryParams, condition));
				if (errors.length > 0) allErrors.push(...errors);
			}

			if (allErrors.length > 0) errorAlert = this.getTextErrorsFromValidationByDto(allErrors)
		}

		return errorAlert;
	}

  async transform(value: HttpQueryParamsFromUrl) {
		// validating for non-existent keys
		for (const key in value) {
			if (!Object.values(QUERY_PARAMETERS).map(v => v as string).includes(key)) throw new BadRequestException(this.getTextErrorNonExistentKeyInObject(value, key));
		}

		// validating conditionsQuery
		if (value?.conditionsQuery) {
			let conditionsQueryDto: ConditionsQueryParamsDto[] | null = null;
      try {
				const parsedData = JSON.parse(value.conditionsQuery);
				if (Array.isArray(parsedData) ) {
					conditionsQueryDto = plainToInstance(ConditionsQueryParamsDto, parsedData);
				} else {
					throw new BadRequestException(this.invalidJsonError(QUERY_PARAMETERS.CONDITIONS_QUERY));
				}
      } catch (error) {
        throw new BadRequestException(this.invalidJsonError(QUERY_PARAMETERS.CONDITIONS_QUERY));
      }

			const allErrors: ValidationError[] = [];
			if (conditionsQueryDto) {
				for (const condition of conditionsQueryDto) {
					const errors = await this.validateByDto(condition);
					if (errors.length > 0) allErrors.push(...errors);
				}
			} else {
				throw new BadRequestException(ERROR.OBJECT_TRANSFORMATION);
			}
			
			if (allErrors.length > 0) throw new BadRequestException(this.getTextErrorsFromValidationByDto(allErrors));

			const errorControllerDto = await this.validationQueryParamsByControllerDto(value);
			if (errorControllerDto) throw new BadRequestException(errorControllerDto);
		}

		// validating limit
		if (value?.limit) {
			let limitDto: LimitsQueryParamsDto | null = null;
      try {
        limitDto = plainToInstance(LimitsQueryParamsDto, JSON.parse(value.limit));
      } catch (error) {
        throw new BadRequestException(this.invalidJsonError(QUERY_PARAMETERS.LIMIT));
      }

      const errors = await this.validateByDto(limitDto);
      if (errors.length > 0) throw new BadRequestException(this.getTextErrorsFromValidationByDto(errors));
		}

    return value;
  }
}