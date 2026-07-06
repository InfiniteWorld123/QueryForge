import { Elysia } from "elysia";
import { getPriorities, getStatuses } from "./reference-data.controller";

export const referenceDataRoutes = new Elysia({ prefix: "/reference-data" });

referenceDataRoutes
	.get("/statuses", getStatuses)
	.get("/priorities", getPriorities);
