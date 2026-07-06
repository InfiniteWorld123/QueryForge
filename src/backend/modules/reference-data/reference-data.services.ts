import { sql } from "drizzle-orm";
import { db } from "#/backend/db";

export const getStatusesService = async () => {
	const result = await db.execute(sql`
		select id, name, key, position
		from statuses
		order by position asc
	`);

	return result;
};

export const getPrioritiesService = async () => {
	const result = await db.execute(sql`
		select id, name, key, level
		from priorities
		order by level asc
	`);

	return result;
};
