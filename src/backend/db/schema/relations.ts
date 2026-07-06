import { relations } from "drizzle-orm/_relations";
import { account, session, user } from "./auth";
import { comments } from "./comments";
import { labels, taskLabels } from "./labels";
import { organizationMembers, projectMembers } from "./memberships";
import { organizations } from "./organizations";
import { projects } from "./projects";
import { priorities, statuses } from "./task-reference";
import { tasks } from "./tasks";

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
