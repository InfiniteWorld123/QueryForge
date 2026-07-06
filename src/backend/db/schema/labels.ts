import {
	index,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import { tasks } from "./tasks";

export const labels = pgTable("labels", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	color: text("color").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const taskLabels = pgTable(
	"task_labels",
	{
		id: text("id").primaryKey(),
		labelId: text("label_id")
			.notNull()
			.references(() => labels.id, { onDelete: "cascade" }),
		taskId: text("task_id")
			.notNull()
			.references(() => tasks.id, { onDelete: "cascade" }),
	},
	(table) => [
		index("task_labels_label_id_idx").on(table.labelId),
		index("task_labels_task_id_idx").on(table.taskId),
		uniqueIndex("task_labels_unique_idx").on(table.labelId, table.taskId),
	],
);
