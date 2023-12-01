import { ERROR, ERROR_BY_HTTP_STATUS } from "src/constants/response.constants";

export const getNameErrorByStatusCode = (status: number): string => {
	const error = Object.keys(ERROR_BY_HTTP_STATUS).find(key => +key === status);
	if (error) return ERROR_BY_HTTP_STATUS[status as keyof typeof ERROR_BY_HTTP_STATUS]
	return ERROR.SOMETHING_WENT_WRONG;
}

export const formatObjectToObjectString = (obj: object) => {
	if (typeof obj !== "object" || obj === null) return null;
	
	let result = '{';
	for (const [key, value] of Object.entries(obj)) {
		result += `${key}: ${value}, `;
	}

	return result + '}';
}