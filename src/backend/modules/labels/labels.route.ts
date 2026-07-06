import { Elysia } from "elysia";
import {
	createLabel,
	deleteLabel,
	getLabels,
	updateLabel,
} from "./labels.controller";
import { CreateLabelSchema, UpdateLabelSchema } from "./labels.validation";

export const labelsRoutes = new Elysia({ prefix: "/labels" });

labelsRoutes
	.get("/", getLabels)
	.post("/", createLabel, { body: CreateLabelSchema })
	.patch("/:labelId", updateLabel, { body: UpdateLabelSchema })
	.delete("/:labelId", deleteLabel);
