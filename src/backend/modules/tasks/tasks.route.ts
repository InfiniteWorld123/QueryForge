import { Elysia } from "elysia";
import {
	addTaskLabel,
	assignTask,
	completeTask,
	createTask,
	deleteTask,
	deleteTaskLabel,
	getTask,
	getTaskLabels,
	getTasks,
	reopenTask,
	updateTask,
} from "./tasks.controller";
import {
	AddTaskLabelSchema,
	AssignTaskSchema,
	CreateTaskSchema,
	UpdateTaskSchema,
} from "./tasks.validation";

export const tasksRoutes = new Elysia({ prefix: "/tasks" });

tasksRoutes
	.get("/", getTasks)
	.post("/", createTask, { body: CreateTaskSchema })
	.get("/:taskId", getTask)
	.patch("/:taskId", updateTask, { body: UpdateTaskSchema })
	.delete("/:taskId", deleteTask)
	.post("/:taskId/assign", assignTask, { body: AssignTaskSchema })
	.post("/:taskId/complete", completeTask)
	.post("/:taskId/reopen", reopenTask)
	.get("/:taskId/labels", getTaskLabels)
	.post("/:taskId/labels", addTaskLabel, { body: AddTaskLabelSchema })
	.delete("/:taskId/labels/:labelId", deleteTaskLabel);
