import { relations } from "drizzle-orm/_relations";
import {
	boolean,
	date,
	index,
	integer,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const session = pgTable(
	"session",
	{
		id: text("id").primaryKey(),
		expiresAt: timestamp("expires_at").notNull(),
		token: text("token").notNull().unique(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
	},
	(table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
	"account",
	{
		id: text("id").primaryKey(),
		accountId: text("account_id").notNull(),
		providerId: text("provider_id").notNull(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		accessToken: text("access_token"),
		refreshToken: text("refresh_token"),
		idToken: text("id_token"),
		accessTokenExpiresAt: timestamp("access_token_expires_at"),
		refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
		scope: text("scope"),
		password: text("password"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
	"verification",
	{
		id: text("id").primaryKey(),
		identifier: text("identifier").notNull(),
		value: text("value").notNull(),
		expiresAt: timestamp("expires_at").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const organizations = pgTable(
	"organizations",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		slug: text("slug").notNull(),
		description: text("description"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [uniqueIndex("organizations_slug_idx").on(table.slug)],
);

export const projects = pgTable(
	"projects",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		description: text("description"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organizations.id, { onDelete: "cascade" }),
	},
	(table) => [index("projects_organization_id_idx").on(table.organizationId)],
);

export const statuses = pgTable(
	"statuses",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		key: text("key").notNull(),
		position: integer("position").notNull(),
	},
	(table) => [uniqueIndex("statuses_key_idx").on(table.key)],
);

export const priorities = pgTable(
	"priorities",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		key: text("key").notNull(),
		level: integer("level").notNull(),
	},
	(table) => [uniqueIndex("priorities_key_idx").on(table.key)],
);

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

export const labels = pgTable("labels", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	color: text("color").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

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

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account),
	createdTasks: many(tasks, { relationName: "createdTasks" }),
	assignedTasks: many(tasks, { relationName: "assignedTasks" }),
	comments: many(comments),
	organizationMemberships: many(organizationMembers),
	projectMemberships: many(projectMembers),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));

export const organizationRelations = relations(organizations, ({ many }) => ({
	projects: many(projects),
	members: many(organizationMembers),
}));

export const projectRelations = relations(projects, ({ one, many }) => ({
	organization: one(organizations, {
		fields: [projects.organizationId],
		references: [organizations.id],
	}),
	tasks: many(tasks),
	members: many(projectMembers),
}));

export const taskRelations = relations(tasks, ({ one, many }) => ({
	status: one(statuses, {
		fields: [tasks.statusId],
		references: [statuses.id],
	}),
	priority: one(priorities, {
		fields: [tasks.priorityId],
		references: [priorities.id],
	}),
	project: one(projects, {
		fields: [tasks.projectId],
		references: [projects.id],
	}),
	createdBy: one(user, {
		fields: [tasks.createdByUserId],
		references: [user.id],
		relationName: "createdTasks",
	}),
	assignedTo: one(user, {
		fields: [tasks.assignedToUserId],
		references: [user.id],
		relationName: "assignedTasks",
	}),
	comments: many(comments),
	labels: many(taskLabels),
}));

export const commentRelations = relations(comments, ({ one }) => ({
	task: one(tasks, {
		fields: [comments.taskId],
		references: [tasks.id],
	}),
	user: one(user, {
		fields: [comments.userId],
		references: [user.id],
	}),
}));

export const labelRelations = relations(labels, ({ many }) => ({
	tasks: many(taskLabels),
}));

export const statusRelations = relations(statuses, ({ many }) => ({
	tasks: many(tasks),
}));

export const priorityRelations = relations(priorities, ({ many }) => ({
	tasks: many(tasks),
}));

export const organizationMemberRelations = relations(
	organizationMembers,
	({ one }) => ({
		organization: one(organizations, {
			fields: [organizationMembers.organizationId],
			references: [organizations.id],
		}),
		user: one(user, {
			fields: [organizationMembers.userId],
			references: [user.id],
		}),
	}),
);

export const projectMemberRelations = relations(projectMembers, ({ one }) => ({
	project: one(projects, {
		fields: [projectMembers.projectId],
		references: [projects.id],
	}),
	user: one(user, {
		fields: [projectMembers.userId],
		references: [user.id],
	}),
}));

export const taskLabelRelations = relations(taskLabels, ({ one }) => ({
	label: one(labels, {
		fields: [taskLabels.labelId],
		references: [labels.id],
	}),
	task: one(tasks, {
		fields: [taskLabels.taskId],
		references: [tasks.id],
	}),
}));
