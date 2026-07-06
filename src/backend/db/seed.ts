import "dotenv/config";
import { sql } from "drizzle-orm";
import { db } from "#/backend/db";
import { TASK_PRIORITIES, TASK_STATUSES } from "./reference-data";

const seedStatuses = async () => {
	for (const status of TASK_STATUSES) {
		await db.execute(sql`
			insert into statuses (id, name, key, position)
			values (${status.id}, ${status.name}, ${status.key}, ${status.position})
			on conflict (key) do update set
				name = excluded.name,
				position = excluded.position
		`);
	}
};

const seedPriorities = async () => {
	for (const priority of TASK_PRIORITIES) {
		await db.execute(sql`
			insert into priorities (id, name, key, level)
			values (${priority.id}, ${priority.name}, ${priority.key}, ${priority.level})
			on conflict (key) do update set
				name = excluded.name,
				level = excluded.level
		`);
	}
};

await seedStatuses();
await seedPriorities();

console.info("Reference data seeded successfully");
