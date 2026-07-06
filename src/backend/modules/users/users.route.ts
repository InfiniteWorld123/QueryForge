import { Elysia } from "elysia";
import {
	getCurrentUser,
	getUsers,
	updateCurrentUser,
} from "./users.controller";
import { UpdateCurrentUserSchema } from "./users.validation";

export const usersRoutes = new Elysia({ prefix: "/users" });

usersRoutes
	.get("/me", getCurrentUser)
	.patch("/me", updateCurrentUser, { body: UpdateCurrentUserSchema })
	.get("/", getUsers);
