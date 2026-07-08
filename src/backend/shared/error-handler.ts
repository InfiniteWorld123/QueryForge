import { APIError } from "better-auth/api";
import type { ErrorHandler } from "elysia";
import { type AppError, isAppError } from "./error.ts";
import { HttpStatusCode } from "./http.ts";
import { type ResponseError, responseError } from "./response.ts";

type BetterFetchErrorShape = Error & {
	status?: number;
	error?: {
		message?: string;
		code?: string;
	};
};

type PostgresErrorShape = Error & {
	code?: string;
	constraint?: string;
	table?: string;
	detail?: string;
	cause?: unknown;
	sourceError?: unknown;
};

const findPostgresError = (
	error: unknown,
	seen = new Set<unknown>(),
): PostgresErrorShape | null => {
	if (!error || typeof error !== "object" || seen.has(error)) {
		return null;
	}

	seen.add(error);

	if (
		"code" in error &&
		typeof (error as PostgresErrorShape).code === "string"
	) {
		return error as PostgresErrorShape;
	}

	const maybeWrapped = error as PostgresErrorShape;

	return (
		findPostgresError(maybeWrapped.cause, seen) ??
		findPostgresError(maybeWrapped.sourceError, seen)
	);
};

const isResponseError = (error: unknown): error is ResponseError => {
	if (!error || typeof error !== "object") {
		return false;
	}

	return (
		"success" in error &&
		"status" in error &&
		"message" in error &&
		(error as ResponseError).success === false
	);
};

const toErrorWithResponse = (je: ResponseError): Error & ResponseError =>
	Object.assign(new Error(je.message), je);

const toResponseError = (error: unknown): Error & ResponseError => {
	if (isResponseError(error)) {
		if (error instanceof Error) return error as Error & ResponseError;
		return toErrorWithResponse(error);
	}

	if (isAppError(error)) {
		return toErrorWithResponse(
			responseError({
				message: error.message,
				status: error.status,
				code: error.code,
				details: error.details,
			}),
		);
	}

	// 1. Better Auth Server API Errors
	if (error instanceof APIError) {
		return toErrorWithResponse(
			responseError({
				message: error.body?.message || error.message || "Authentication error",
				status: error.status as HttpStatusCode,
				code: error.body?.code || "AUTH_ERROR",
			}),
		);
	}

	// 2. Generic Error instances
	if (error instanceof Error) {
		const postgresError = findPostgresError(error);

		if (postgresError?.code === "23505") {
			return toErrorWithResponse(
				responseError({
					message: "Resource already exists",
					status: HttpStatusCode.CONFLICT,
					code: "CONFLICT",
					details: {
						constraint: postgresError.constraint,
						table: postgresError.table,
						detail: postgresError.detail,
					},
				}),
			);
		}

		if (postgresError?.code === "23503") {
			return toErrorWithResponse(
				responseError({
					message: "Referenced resource was not found",
					status: HttpStatusCode.BAD_REQUEST,
					code: "BAD_REQUEST",
					details: {
						constraint: postgresError.constraint,
						table: postgresError.table,
						detail: postgresError.detail,
					},
				}),
			);
		}

		if (postgresError?.code === "23502" || postgresError?.code === "22P02") {
			return toErrorWithResponse(
				responseError({
					message: "Invalid database value",
					status: HttpStatusCode.BAD_REQUEST,
					code: "BAD_REQUEST",
					details: {
						constraint: postgresError.constraint,
						table: postgresError.table,
						detail: postgresError.detail,
					},
				}),
			);
		}

		// Better Fetch client error check (if thrown from authClient)
		if ("status" in error && "error" in error) {
			const fetchError = error as BetterFetchErrorShape;
			return toErrorWithResponse(
				responseError({
					message:
						fetchError.error?.message ||
						fetchError.message ||
						"Client authentication error",
					status:
						(fetchError.status as HttpStatusCode | undefined) ||
						HttpStatusCode.BAD_REQUEST,
					code: fetchError.error?.code || "AUTH_FETCH_ERROR",
				}),
			);
		}

		return toErrorWithResponse(
			responseError({
				message: error.message || "An unexpected error occurred",
				status: HttpStatusCode.INTERNAL_SERVER_ERROR,
				code: "INTERNAL_ERROR",
			}),
		);
	}

	// 3. Fallback
	return toErrorWithResponse(
		responseError({
			message: "An unexpected error occurred",
			status: HttpStatusCode.INTERNAL_SERVER_ERROR,
			code: "UNKNOWN_ERROR",
		}),
	);
};

export const handleError: ErrorHandler<{ AppError: AppError }> = ({
	code,
	error,
	status,
}) => {
	if (code === "VALIDATION") {
		const validationError = responseError({
			message: error.message,
			status: HttpStatusCode.UNPROCESSABLE_ENTITY,
			code: "VALIDATION_ERROR",
		});

		return status(validationError.status, validationError);
	}

	if (code === "NOT_FOUND") {
		const notFoundError = responseError({
			message: "Route not found",
			status: HttpStatusCode.NOT_FOUND,
			code: "NOT_FOUND",
		});

		return status(notFoundError.status, notFoundError);
	}

	const response = toResponseError(error);

	return status(response.status, response);
};
