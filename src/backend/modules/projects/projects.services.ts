import type {
	AddProjectMemberBodyType,
	CreateProjectBodyType,
	GetProjectsQueryType,
	ProjectMemberParamsType,
	ProjectParamsType,
	UpdateProjectBodyType,
} from "./projects.type";

export const getProjectsService = async ({
	query,
}: {
	query?: GetProjectsQueryType;
}) => {
	void query;
	return [];
};

export const createProjectService = async ({
	body,
}: {
	body: CreateProjectBodyType;
}) => {
	void body;
	return null;
};

export const getProjectService = async ({
	params,
}: {
	params: ProjectParamsType;
}) => {
	void params;
	return null;
};

export const updateProjectService = async ({
	params,
	body,
}: {
	params: ProjectParamsType;
	body: UpdateProjectBodyType;
}) => {
	void params;
	void body;
	return null;
};

export const deleteProjectService = async ({
	params,
}: {
	params: ProjectParamsType;
}) => {
	void params;
	return null;
};

export const getProjectMembersService = async ({
	params,
}: {
	params: ProjectParamsType;
}) => {
	void params;
	return [];
};

export const addProjectMemberService = async ({
	params,
	body,
}: {
	params: ProjectParamsType;
	body: AddProjectMemberBodyType;
}) => {
	void params;
	void body;
	return null;
};

export const deleteProjectMemberService = async ({
	params,
}: {
	params: ProjectMemberParamsType;
}) => {
	void params;
	return null;
};
