import type * as v from "valibot";
import type {
	AddProjectMemberSchema,
	CreateProjectSchema,
	UpdateProjectSchema,
} from "./projects.validation";

export type CreateProjectBodyType = v.InferInput<typeof CreateProjectSchema>;
export type UpdateProjectBodyType = v.InferInput<typeof UpdateProjectSchema>;
export type AddProjectMemberBodyType = v.InferInput<
	typeof AddProjectMemberSchema
>;

export type ProjectParamsType = {
	projectId: string;
};

export type ProjectMemberParamsType = ProjectParamsType & {
	userId: string;
};

export type GetProjectsQueryType = {
	organizationId?: string;
};
