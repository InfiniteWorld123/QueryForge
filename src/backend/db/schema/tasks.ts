import { date, index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { projects } from "./projects";
import { priorities, statuses } from "./task-reference";

export const tasks = pgTable(
	"tasks",
	{
		id: text("id").primaryKey(),
		title: text("title").notNull(),
		description: text("description"),
		dueDate: date("due_date"),
		completedAt: timestamp("completed_at"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
		statusId: text("status_id")
			.notNull()
			.references(() => statuses.id),
		priorityId: text("priority_id")
			.notNull()
			.references(() => priorities.id),
		projectId: text("project_id")
			.notNull()
			.references(() => projects.id, { onDelete: "cascade" }),
		createdByUserId: text("created_by_user_id")
			.notNull()
			.references(() => user.id),
		assignedToUserId: text("assigned_to_user_id").references(() => user.id),
	},
	(table) => [
		index("tasks_status_id_idx").on(table.statusId),
		index("tasks_priority_id_idx").on(table.priorityId),
		index("tasks_project_id_idx").on(table.projectId),
		index("tasks_created_by_user_id_idx").on(table.createdByUserId),
		index("tasks_assigned_to_user_id_idx").on(table.assignedToUserId),
	],
);
