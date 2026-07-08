import { sql } from "drizzle-orm";
import { db } from "#/backend/db";
import {
	ensureUpdateBody,
	requireCreated,
	requireFound,
	requireInserted,
} from "#/backend/shared/service-utils";
import type {
	AddOrganizationMemberBodyType,
	CreateOrganizationBodyType,
	OrganizationMemberParamsType,
	OrganizationParamsType,
	UpdateOrganizationBodyType,
} from "./organizations.type";

export const getOrganizationsService = async () => {
	const result = await db.execute(sql`
		select
			id,
			name,
			slug,
			description,
			created_at as "createdAt",
			updated_at as "updatedAt"
		from organizations
		order by created_at desc
	`);

	return result.rows;
};

export const createOrganizationService = async ({
	body,
}: {
	body: CreateOrganizationBodyType;
}) => {
	const id = crypto.randomUUID();

	const result = await db.execute(sql`
		insert into organizations (
			id,
			name,
			slug,
			description
		)
		values (
			${id},
			${body.name},
			${body.slug},
			${body.description ?? null}
		)
		returning
			id,
			name,
			slug,
			description,
			created_at as "createdAt",
			updated_at as "updatedAt"
	`);

	return requireCreated(result.rows[0], "Organization could not be created");
};

export const getOrganizationService = async ({
	params,
}: {
	params: OrganizationParamsType;
}) => {
	const result = await db.execute(sql`
		select
			id,
			name,
			slug,
			description,
			created_at as "createdAt",
			updated_at as "updatedAt"
		from organizations
		where id = ${params.organizationId}
		limit 1
	`);

	return requireFound(result.rows[0], "Organization not found");
};

export const updateOrganizationService = async ({
	params,
	body,
}: {
	params: OrganizationParamsType;
	body: UpdateOrganizationBodyType;
}) => {
	ensureUpdateBody(body, "At least one organization field is required");

	const result = await db.execute(sql`
		update organizations
		set
			name = coalesce(${body.name ?? null}, name),
			slug = coalesce(${body.slug ?? null}, slug),
			description = coalesce(${body.description ?? null}, description),
			updated_at = now()
		where id = ${params.organizationId}
		returning
			id,
			name,
			slug,
			description,
			created_at as "createdAt",
			updated_at as "updatedAt"
	`);

	return requireFound(result.rows[0], "Organization not found");
};

export const deleteOrganizationService = async ({
	params,
}: {
	params: OrganizationParamsType;
}) => {
	const result = await db.execute(sql`
		delete from organizations
		where id = ${params.organizationId}
		returning
			id,
			name,
			slug,
			description,
			created_at as "createdAt",
			updated_at as "updatedAt"
	`);

	return requireFound(result.rows[0], "Organization not found");
};

export const getOrganizationMembersService = async ({
	params,
}: {
	params: OrganizationParamsType;
}) => {
	const result = await db.execute(sql`
		select
			om.id as "membershipId",
			u.id as "userId",
			u.name,
			u.email,
			u.image
		from organization_members om
		join "user" u
			on u.id = om.user_id
		where om.organization_id = ${params.organizationId}
		order by u.name asc
	`);

	return result.rows;
};

export const addOrganizationMemberService = async ({
	params,
	body,
}: {
	params: OrganizationParamsType;
	body: AddOrganizationMemberBodyType;
}) => {
	const id = crypto.randomUUID();

	const result = await db.execute(sql`
		insert into organization_members (
			id,
			organization_id,
			user_id
		)
		values (
			${id},
			${params.organizationId},
			${body.userId}
		)
		on conflict (organization_id, user_id) do nothing
		returning
			id,
			organization_id as "organizationId",
			user_id as "userId"
	`);

	return requireInserted(
		result.rows[0],
		"User is already an organization member",
	);
};

export const deleteOrganizationMemberService = async ({
	params,
}: {
	params: OrganizationMemberParamsType;
}) => {
	const result = await db.execute(sql`
		delete 
		from organization_members om
		where om.organization_id = ${params.organizationId}
			and om.user_id = ${params.userId}
		returning
			om.id,
			om.organization_id as "organizationId",
			om.user_id as "userId"
	`);

	return requireFound(result.rows[0], "Organization member not found");
};
