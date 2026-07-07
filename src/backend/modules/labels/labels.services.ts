import { sql } from "drizzle-orm";
import { db } from "#/backend/db";
import type {
	CreateLabelBodyType,
	LabelParamsType,
	UpdateLabelBodyType,
} from "./labels.type";

export const getLabelsService = async () => {
	const result = await db.execute(sql`
		select
			id,
			name,
			color,
			created_at as "createdAt"
		from labels
		order by name asc
	`);

	return result.rows;
};

export const createLabelService = async ({
	body,
}: {
	body: CreateLabelBodyType;
}) => {
	const id = crypto.randomUUID();

	const result = await db.execute(sql`
		insert into labels (
			id,
			name,
			color
		)
		values (
			${id},
			${body.name},
			${body.color}
		)
		returning
			id,
			name,
			color,
			created_at as "createdAt"
	`);

	return result.rows[0] ?? null;
};

export const updateLabelService = async ({
	params,
	body,
}: {
	params: LabelParamsType;
	body: UpdateLabelBodyType;
}) => {
	if (body.name === undefined && body.color === undefined) {
		return null;
	}

	const result = await db.execute(sql`
		update labels
		set
			name = coalesce(${body.name ?? null}, name),
			color = coalesce(${body.color ?? null}, color)
		where id = ${params.labelId}
		returning
			id,
			name,
			color,
			created_at as "createdAt"
	`);

	return result.rows[0] ?? null;
};

export const deleteLabelService = async ({
	params,
}: {
	params: LabelParamsType;
}) => {
	const result = await db.execute(sql`
		delete from labels
		where id = ${params.labelId}
		returning
			id,
			name,
			color,
			created_at as "createdAt"
	`);

	return result.rows[0] ?? null;
};
