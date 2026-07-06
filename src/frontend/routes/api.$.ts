import { treaty } from "@elysia/eden";
import { createFileRoute } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { Elysia } from "elysia";
import { authRoutes } from "#/backend/modules/auth/auth.route";
import { commentsRoutes } from "#/backend/modules/comments/comments.route";
import { labelsRoutes } from "#/backend/modules/labels/labels.route";
import { organizationsRoutes } from "#/backend/modules/organizations/organizations.route";
import { projectsRoutes } from "#/backend/modules/projects/projects.route";
import { referenceDataRoutes } from "#/backend/modules/reference-data/reference-data.route";
import { reportsRoutes } from "#/backend/modules/reports/reports.route";
import { tasksRoutes } from "#/backend/modules/tasks/tasks.route";
import { usersRoutes } from "#/backend/modules/users/users.route";
import { AppError } from "#/backend/shared/error";
import { handleError } from "#/backend/shared/error-handler";
import { auth } from "../../backend/shared/auth";

const app = new Elysia({ prefix: "/api" })
	.error({ AppError })
	.onError(handleError)
	.mount(auth.handler)
	.use(authRoutes)
	.use(usersRoutes)
	.use(organizationsRoutes)
	.use(projectsRoutes)
	.use(tasksRoutes)
	.use(commentsRoutes)
	.use(labelsRoutes)
	.use(referenceDataRoutes)
	.use(reportsRoutes)
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
