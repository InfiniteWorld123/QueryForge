import { index, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { organizations } from "./organizations";
import { projects } from "./projects";

export const organizationMembers = pgTable(
	"organization_members",
	{
		id: text("id").primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organizations.id, { onDelete: "cascade" }),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
	},
	(table) => [
		index("organization_members_organization_id_idx").on(table.organizationId),
		index("organization_members_user_id_idx").on(table.userId),
		uniqueIndex("organization_members_unique_idx").on(
			table.organizationId,
			table.userId,
		),
	],
);

export const projectMembers = pgTable(
	"project_members",
	{
		id: text("id").primaryKey(),
		projectId: text("project_id")
			.notNull()
			.references(() => projects.id, { onDelete: "cascade" }),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
	},
	(table) => [
		index("project_members_project_id_idx").on(table.projectId),
		index("project_members_user_id_idx").on(table.userId),
		uniqueIndex("project_members_unique_idx").on(table.projectId, table.userId),
	],
);
