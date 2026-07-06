import * as v from "valibot";
import { HttpStatusCode } from "#/backend/shared/http";
import { responseOk } from "#/backend/shared/response";
import {
	getCurrentUserService,
	getUsersService,
	updateCurrentUserService,
} from "./users.services";
import type { UpdateCurrentUserBodyType } from "./users.type";
import { UpdateCurrentUserSchema } from "./users.validation";

export const getCurrentUser = async () => {
	const result = await getCurrentUserService();

	return responseOk({
		status: HttpStatusCode.OK,
		data: result,
		message: "current user fetched",
	});
};

export const updateCurrentUser = async ({
	body,
}: {
	body: UpdateCurrentUserBodyType;
}) => {
	const parsedBody = v.parse(UpdateCurrentUserSchema, body);
	const result = await updateCurrentUserService({ body: parsedBody });

	return responseOk({
		status: HttpStatusCode.OK,
		data: result,
		message: "current user updated",
	});
};

export const getUsers = async ({
	query,
}: {
	query?: Record<string, unknown>;
}) => {
	const result = await getUsersService({ query });

	return responseOk({
		status: HttpStatusCode.OK,
		data: result,
		message: "users fetched",
	});
};
