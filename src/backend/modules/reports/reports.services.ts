import { sql } from "drizzle-orm";
import { db } from "#/backend/db";
import type { ProjectReportParamsType } from "./reports.type";

export const getTasksByStatusReportService = async () => {
	const result = await db.execute(sql`
		select
			s.id,
			s.name,
			s.key,
			count(t.id)::int as "taskCount"
		from statuses s
		left join tasks t
			on t.status_id = s.id
		group by s.id, s.name, s.key, s.position
		order by s.position asc
	`);

	return result.rows;
};

export const getTasksByProjectReportService = async () => {
	const result = await db.execute(sql`
		select
			p.id,
			p.name,
			p.description,
			count(t.id)::int as "taskCount"
		from projects p
		left join tasks t
			on t.project_id = p.id
		group by p.id, p.name, p.description
		order by "taskCount" desc
	`);

	return result.rows;
};

export const getTasksByAssigneeReportService = async () => {
	const result = await db.execute(sql`
		select
			u.id,
			u.name,
			u.email,
			u.image,
			count(t.id)::int as "taskCount"
		from "user" u
		left join tasks t
			on t.assigned_to_user_id = u.id
		group by u.id, u.name, u.email, u.image
		order by "taskCount" desc
	`);

	return result.rows;
};

export const getOverdueTasksReportService = async () => {
	const result = await db.execute(sql`
		select
			id,
			title,
			due_date as "dueDate",
			completed_at as "completedAt"
		from tasks
		where due_date < current_date
			and completed_at is null
		order by due_date asc
	`);

	return result.rows;
};

export const getLabelUsageReportService = async () => {
	const result = await db.execute(sql`
		select
			l.id,
			l.name,
			l.color,
			count(tl.task_id)::int as "taskCount"
		from labels l
		left join task_labels tl
			on tl.label_id = l.id
		group by l.id, l.name, l.color
		order by "taskCount" desc
	`);

	return result.rows;
};

export const getProjectHealthReportService = async ({
	params,
}: {
	params?: ProjectReportParamsType;
}) => {
	const projectId = params?.projectId ?? null;

	const result = await db.execute(sql`
		select
			p.id,
			p.name,
			count(t.id)::int as "totalTasks",
			(count(t.id) filter (where t.completed_at is not null))::int as "completedTasks",
			(count(t.id) filter (
				where t.completed_at is null
					and t.due_date < current_date
			))::int as "overdueTasks",
			(count(t.id) filter (where t.completed_at is null))::int as "openTasks"
		from projects p
		left join tasks t
			on t.project_id = p.id
		where (${projectId}::text is null or p.id = ${projectId})
		group by p.id, p.name
		order by p.name asc
	`);

	return result.rows;
};
