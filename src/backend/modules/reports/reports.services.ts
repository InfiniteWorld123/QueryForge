import { db } from "#/backend/db";
import { sql } from "drizzle-orm";
import type { ProjectReportParamsType } from "./reports.type";

export const getTasksByStatusReportService = async () => {
	const result = await db.execute(sql`	
		select
			s.id,
			s.name,
			s.key,
			count(t.id) as task_count
		from statuses s
		left join tasks t 
			on t.status_id = s.id
		group by s.id, s.name, s.key, s.position
		order by s.position asc
	`);

	return result.rows ?? null;
};

export const getTasksByProjectReportService = async () => {
	const result = await db.execute(sql`	
		select
			p.name,
			p.description
			count(t.id) as task_count
		from projects p
		left join tasks t
			on t.project_id = p.id
		group by p.id, p.name
		order by task_count desc
	`);

	return result.rows ?? null;
};

export const getTasksByAssigneeReportService = async () => {
	const result = await db.execute(sql`	
		select
			u.id,
			u.name,
			u.email,
			u.image
			count(t.id) as task_count
		from "user" u
		left join tasks t 
			on t.assigned_to_user_id = u.id
		group by u.id, u.name, u.email u.image
		order by task_count desc
	`);

	return result.rows ?? null;
};

export const getOverdueTasksReportService = async () => {
	const result = await db.execute(sql`	
		select
			id,
			title,
			due_date,
			completed_at
		from tasks
		where due_date < current_date
			and completed_at is null
		order by due_date asc
	`);

	return result.rows ?? null;
};

export const getLabelUsageReportService = async () => {
	const result = await db.execute(sql`	
		select
			l.id,
			l.name,
			l.color,
			count(tl.task_id) as task_count
		from labels l
		left join task_labels tl 
			on tl.label_id = l.id
		group by l.id, l.name, l.color
		order by task_count desc
	`);

	return result.rows ?? null;
};

export const getProjectHealthReportService = async ({
	params,
}: {
	params?: ProjectReportParamsType;
}) => {
	const result = await db.execute(sql`	
		select
			p.id,
			p.name,
			count(t.id) as total_tasks,
			count(t.id) filter (where t.completed_at is not null) as completed_tasks,
			count(t.id) filter (
				where t.completed_at is null
					and t.due_date < current_date
			) as overdue_tasks,
			count(t.id) filter (where t.completed_at is null) as open_tasks
		from projects p
		left join tasks t on t.project_id = p.id
		where p.id = ${params?.projectId}
		group by p.id, p.name
	`);

	return result.rows ?? null;
};
