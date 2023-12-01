export const QUERY_PARAMETERS = {
	CONDITIONS_QUERY: 'conditionsQuery' as const,
	LIMIT: 'limit' as const
};
export const QUERY_CONDITIONS = {
	LESS: "less" as const,
	LESS_OR_EQUAL: "lessOrEqual" as const,
	GREATER: "greater" as const,
	GREATER_OR_EQUAL: "greaterOrEqual" as const,
	EQUAL: "equal" as const,
	NOT_EQUAL: "notEqual" as const,
}
export const ORDER_BY = {
	ASC: "asc" as const,
	DESC: "desc" as const
};
export const ADDITIONAL_TEXT = {
	YOU_REQUEST: "You request",
	CATCH_ERROR: "Catch error",
}