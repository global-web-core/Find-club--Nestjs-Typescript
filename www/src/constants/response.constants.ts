export const STATUS_RESPONSE = {
  SUCCESS: 'success',
  ERROR: 'error'
};

export const CODE_RESPONSE = {
	OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
}

export const ERROR = {
	API_KEY: 'Invalid API Key',
	NOT_FOUND: 'Not found',
	SOMETHING_WENT_WRONG: 'Something went wrong',
	INTERNAL_SERVER_ERROR: 'Internal server error',
	UNKNOW_KEY: 'Unknown key',
	INVALID_DATA: 'Invalid data',
	VALIDATION_ERROR_AT: 'Validation error at',
	INVALID_JSON_FORMAT: 'Invalid JSON format',
	INVALID_RECEIVED_DTO: 'Invalid reseived DTO',
	OBJECT_TRANSFORMATION: 'Error object transformation',
}

export const ERROR_BY_HTTP_STATUS = {
	400: 'Bad Request',
	401: 'Unauthorized',
	403: 'Forbidden',
	404: 'Not Found',
	500: 'Internal Server Error',
	502: 'Bad Gateway',
	503: 'Service Unavailable',
	504: 'Gateway Timeout',
}

export const RESPONSE_INVALID_API_KEY = {
	status: STATUS_RESPONSE.ERROR,
	code: CODE_RESPONSE.UNAUTHORIZED,
	error: ERROR.API_KEY,
}