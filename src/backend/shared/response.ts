import { HttpStatusCode } from "./http";

export type ResponseOk<T> = {
	success: true;
	status: HttpStatusCode;
	message: string;
	data: T;
};

export type ResponseError = {
	success: false;
	status: HttpStatusCode;
	message: string;
	code?: string;
	details?: unknown;
};

export const responseOk = <T>({
	data,
	status,
	message,
}: {
	data: T;
	status?: HttpStatusCode;
	message?: string;
}): ResponseOk<T> => {
	return {
		success: true,
		message: message ?? "Success",
		status: status ?? HttpStatusCode.OK,
		data,
	};
};

export const responseError = ({
	message,
	status,
	code,
	details,
}: {
	message: string;
	status?: HttpStatusCode;
	code?: string;
	details?: unknown;
}): ResponseError => {
	return {
		success: false,
		status: status ?? HttpStatusCode.BAD_REQUEST,
		message,
		code,
		details,
	};
};
