import type * as v from "valibot";
import type { UpdateCurrentUserSchema } from "./users.validation";

export type UpdateCurrentUserBodyType = v.InferInput<
	typeof UpdateCurrentUserSchema
>;

export type GetUsersServiceType = {
	query?: Record<string, unknown>;
};

export type UpdateCurrentUserServiceType = UpdateCurrentUserBodyType;
