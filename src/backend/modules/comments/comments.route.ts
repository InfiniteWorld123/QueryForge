import { Elysia } from "elysia";
import {
	createTaskComment,
	deleteComment,
	getTaskComments,
	updateComment,
} from "./comments.controller";
import {
	CreateCommentSchema,
	UpdateCommentSchema,
} from "./comments.validation";

export const commentsRoutes = new Elysia();

commentsRoutes
	.get("/tasks/:taskId/comments", getTaskComments)
	.post("/tasks/:taskId/comments", createTaskComment, {
		body: CreateCommentSchema,
	})
	.patch("/comments/:commentId", updateComment, { body: UpdateCommentSchema })
	.delete("/comments/:commentId", deleteComment);
