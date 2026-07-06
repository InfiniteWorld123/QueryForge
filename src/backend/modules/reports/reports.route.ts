import { Elysia } from "elysia";
import {
	getLabelUsageReport,
	getOverdueTasksReport,
	getProjectHealthByProjectReport,
	getProjectHealthReport,
	getTasksByAssigneeReport,
	getTasksByProjectReport,
	getTasksByStatusReport,
} from "./reports.controller";

export const reportsRoutes = new Elysia({ prefix: "/reports" });

reportsRoutes
	.get("/tasks-by-status", getTasksByStatusReport)
	.get("/tasks-by-project", getTasksByProjectReport)
	.get("/tasks-by-assignee", getTasksByAssigneeReport)
	.get("/overdue-tasks", getOverdueTasksReport)
	.get("/label-usage", getLabelUsageReport)
	.get("/project-health", getProjectHealthReport)
	.get("/project-health/:projectId", getProjectHealthByProjectReport);
