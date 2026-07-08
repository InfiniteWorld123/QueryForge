import { sql } from "drizzle-orm";
import { db } from "#/backend/db";
import {
	ensureUpdateBody,
	requireCreated,
	requireFound,
	requireInserted,
} from "#/backend/shared/service-utils";
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
	const result = await db.execute(sql`
		select
			id,
			name,
			description,
			created_at as "createdAt",
			updated_at as "updatedAt",
			organization_id as "organizationId"
		from projects
		where organization_id = ${query?.organizationId}
		order by created_at desc
	`);

	return result.rows;
};

export const createProjectService = async ({
	body,
}: {
	body: CreateProjectBodyType;
}) => {
	const id = crypto.randomUUID();

	const result = await db.execute(sql`
		insert into projects (
			id,
			name,
			description,
			organization_id
		)
		values (
			${id},
			${body.name},
			${body.description ?? null},
			${body.organizationId}
		)
		returning
			id,
			name,
			description,
			created_at as "createdAt",
			updated_at as "updatedAt",
			organization_id as "organizationId"
	`);

	return requireCreated(result.rows[0], "Project could not be created");
};

export const getProjectService = async ({
	params,
}: {
	params: ProjectParamsType;
}) => {
	const result = await db.execute(sql`
		select
			id,
			name,
			description,
			created_at as "createdAt",
			updated_at as "updatedAt",
			organization_id as "organizationId"
		from projects
		where id = ${params.projectId}
		limit 1
	`);

	return requireFound(result.rows[0], "Project not found");
};

export const updateProjectService = async ({
	params,
	body,
}: {
	params: ProjectParamsType;
	body: UpdateProjectBodyType;
}) => {
	ensureUpdateBody(body, "At least one project field is required");

	const result = await db.execute(sql`
		update projects
		set
			name = coalesce(${body.name ?? null}, name),
			description = coalesce(${body.description ?? null}, description),
			updated_at = now()
		where id = ${params.projectId}
		returning
			id,
			name,
			description,
			created_at as "createdAt",
			updated_at as "updatedAt",
			organization_id as "organizationId"
	`);

	return requireFound(result.rows[0], "Project not found");
};

export const deleteProjectService = async ({
	params,
}: {
	params: ProjectParamsType;
}) => {
	const result = await db.execute(sql`
		delete from projects
		where id = ${params.projectId}
		returning
			id,
			name,
			description,
			created_at as "createdAt",
			updated_at as "updatedAt",
			organization_id as "organizationId"
	`);

	return requireFound(result.rows[0], "Project not found");
};

export const getProjectMembersService = async ({
	params,
}: {
	params: ProjectParamsType;
}) => {
	const result = await db.execute(sql`
		select
			pm.id as "membershipId",
			u.id as "userId",
			u.name,
			u.email,
			u.image
		from project_members pm
		inner join "user" u
			on u.id = pm.user_id
		where pm.project_id = ${params.projectId}
		order by u.name asc
	`);

	return result.rows;
};

export const addProjectMemberService = async ({
	params,
	body,
}: {
	params: ProjectParamsType;
	body: AddProjectMemberBodyType;
}) => {
	const id = crypto.randomUUID();

	const result = await db.execute(sql`
		insert into project_members (
			id,
			project_id,
			user_id
		)
		values (
			${id},
			${params.projectId},
			${body.userId}
		)
		on conflict (project_id, user_id) do nothing
		returning
			id,
			project_id as "projectId",
			user_id as "userId"
	`);

	return requireInserted(result.rows[0], "User is already a project member");
};

export const deleteProjectMemberService = async ({
	params,
}: {
	params: ProjectMemberParamsType;
}) => {
	const result = await db.execute(sql`
		delete from project_members pm
		where pm.project_id = ${params.projectId}
			and pm.user_id = ${params.userId}
		returning
			pm.id,
			pm.project_id as "projectId",
			pm.user_id as "userId"
	`);

	return requireFound(result.rows[0], "Project member not found");
};
