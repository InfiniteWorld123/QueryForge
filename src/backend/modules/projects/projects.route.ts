import { Elysia } from "elysia";
import {
	addProjectMember,
	createProject,
	deleteProject,
	deleteProjectMember,
	getProject,
	getProjectMembers,
	getProjects,
	updateProject,
} from "./projects.controller";
import {
	AddProjectMemberSchema,
	CreateProjectSchema,
	UpdateProjectSchema,
} from "./projects.validation";

export const projectsRoutes = new Elysia({ prefix: "/projects" });

projectsRoutes
	.get("/", getProjects)
	.post("/", createProject, { body: CreateProjectSchema })
	.get("/:projectId", getProject)
	.patch("/:projectId", updateProject, { body: UpdateProjectSchema })
	.delete("/:projectId", deleteProject)
	.get("/:projectId/members", getProjectMembers)
	.post("/:projectId/members", addProjectMember, {
		body: AddProjectMemberSchema,
	})
	.delete("/:projectId/members/:userId", deleteProjectMember);
