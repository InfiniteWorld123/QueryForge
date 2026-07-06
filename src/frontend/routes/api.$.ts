import { treaty } from "@elysia/eden";
import { createFileRoute } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { Elysia } from "elysia";
import { AppError } from "#/backend/shared/error";
import { handleError } from "#/backend/shared/error-handler";
import { authRoutes } from "#/backend/modules/auth/auth.route";
import { auth } from "../../backend/shared/auth";

const app = new Elysia({ prefix: "/api" })
	.error({ AppError })
	.onError(handleError)
	.mount(auth.handler)
	.use(authRoutes)
	.get("/", "Hello from api route!");

const handle = ({ request }: { request: Request }) => app.fetch(request);

export const Route = createFileRoute("/api/$")({
	server: {
		handlers: {
			GET: handle,
			POST: handle,
			DELETE: handle,
			PATCH: handle,
			PUT: handle,
		},
	},
});

export const getTreaty = createIsomorphicFn()
	.server(() => treaty(app).api)
	.client(() => treaty<typeof app>("localhost:3000").api);
