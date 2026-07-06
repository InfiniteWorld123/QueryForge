import * as v from "valibot";
import { HttpStatusCode } from "#/backend/shared/http";
import { responseOk } from "#/backend/shared/response";
import {
	addProjectMemberService,
	createProjectService,
	deleteProjectMemberService,
	deleteProjectService,
	getProjectMembersService,
	getProjectService,
	getProjectsService,
	updateProjectService,
} from "./projects.services";
import type {
	AddProjectMemberBodyType,
	CreateProjectBodyType,
	GetProjectsQueryType,
	ProjectMemberParamsType,
	ProjectParamsType,
	UpdateProjectBodyType,
} from "./projects.type";
import {
	AddProjectMemberSchema,
	CreateProjectSchema,
	UpdateProjectSchema,
} from "./projects.validation";

export const getProjects = async ({
	query,
}: {
	query?: GetProjectsQueryType;
}) => {
	const result = await getProjectsService({ query });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const createProject = async ({
	body,
}: {
	body: CreateProjectBodyType;
}) => {
	const parsedBody = v.parse(CreateProjectSchema, body);
	const result = await createProjectService({ body: parsedBody });
	return responseOk({ status: HttpStatusCode.CREATED, data: result });
};

export const getProject = async ({ params }: { params: ProjectParamsType }) => {
	const result = await getProjectService({ params });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const updateProject = async ({
	params,
	body,
}: {
	params: ProjectParamsType;
	body: UpdateProjectBodyType;
}) => {
	const parsedBody = v.parse(UpdateProjectSchema, body);
	const result = await updateProjectService({ params, body: parsedBody });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const deleteProject = async ({
	params,
}: {
	params: ProjectParamsType;
}) => {
	const result = await deleteProjectService({ params });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const getProjectMembers = async ({
	params,
}: {
	params: ProjectParamsType;
}) => {
	const result = await getProjectMembersService({ params });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const addProjectMember = async ({
	params,
	body,
}: {
	params: ProjectParamsType;
	body: AddProjectMemberBodyType;
}) => {
	const parsedBody = v.parse(AddProjectMemberSchema, body);
	const result = await addProjectMemberService({ params, body: parsedBody });
	return responseOk({ status: HttpStatusCode.CREATED, data: result });
};

export const deleteProjectMember = async ({
	params,
}: {
	params: ProjectMemberParamsType;
}) => {
	const result = await deleteProjectMemberService({ params });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};
