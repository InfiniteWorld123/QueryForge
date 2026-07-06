import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { tasks } from "./tasks";

export const comments = pgTable(
	"comments",
	{
		id: text("id").primaryKey(),
		body: text("body").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
		taskId: text("task_id")
			.notNull()
			.references(() => tasks.id, { onDelete: "cascade" }),
		userId: text("user_id")
			.notNull()
			.references(() => user.id),
	},
	(table) => [
		index("comments_task_id_idx").on(table.taskId),
		index("comments_user_id_idx").on(table.userId),
	],
);
