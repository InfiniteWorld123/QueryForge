import { sql } from "drizzle-orm";
import { db } from "#/backend/db";
import {
	ensureUpdateBody,
	requireCreated,
	requireFound,
	requireInserted,
} from "#/backend/shared/service-utils";
import type {
	AddTaskLabelBodyType,
	AssignTaskBodyType,
	CreateTaskBodyType,
	GetTasksQueryType,
	TaskLabelParamsType,
	TaskParamsType,
	UpdateTaskBodyType,
} from "./tasks.type";

const taskSelect = sql`
	id,
	title,
	description,
	due_date as "dueDate",
	completed_at as "completedAt",
	created_at as "createdAt",
	updated_at as "updatedAt",
	status_id as "statusId",
	priority_id as "priorityId",
	project_id as "projectId",
	created_by_user_id as "createdByUserId",
	assigned_to_user_id as "assignedToUserId"
`;

export const getTasksService = async ({
	query,
}: {
	query?: GetTasksQueryType;
}) => {
	const projectId = query?.projectId ?? null;
	const statusId = query?.statusId ?? null;
	const priorityId = query?.priorityId ?? null;
	const assignedToUserId = query?.assignedToUserId ?? null;
	const labelId = query?.labelId ?? null;

	const result = await db.execute(sql`
		select
			${taskSelect}
		from tasks
		where (${projectId}::text is null or project_id = ${projectId})
			and (${statusId}::text is null or status_id = ${statusId})
			and (${priorityId}::text is null or priority_id = ${priorityId})
			and (${assignedToUserId}::text is null or assigned_to_user_id = ${assignedToUserId})
			and (
				${labelId}::text is null
				or exists (
					select 1
					from task_labels tl
					where tl.task_id = tasks.id
						and tl.label_id = ${labelId}
				)
			)
		order by created_at desc
	`);

	return result.rows;
};

export const createTaskService = async ({
	body,
}: {
	body: CreateTaskBodyType;
}) => {
	const id = crypto.randomUUID();

	const result = await db.execute(sql`
		insert into tasks (
			id,
			title,
			description,
			due_date,
			status_id,
			priority_id,
			project_id,
			created_by_user_id,
			assigned_to_user_id
		)
		values (
			${id},
			${body.title},
			${body.description ?? null},
			${body.dueDate ?? null},
			${body.statusId},
			${body.priorityId},
			${body.projectId},
			${body.createdByUserId},
			${body.assignedToUserId ?? null}
		)
		returning
			${taskSelect}
	`);

	return requireCreated(result.rows[0], "Task could not be created");
};

export const getTaskService = async ({
	params,
}: {
	params: TaskParamsType;
}) => {
	const result = await db.execute(sql`
		select
			${taskSelect}
		from tasks
		where id = ${params.taskId}
		limit 1
	`);

	return requireFound(result.rows[0], "Task not found");
};

export const updateTaskService = async ({
	params,
	body,
}: {
	params: TaskParamsType;
	body: UpdateTaskBodyType;
}) => {
	ensureUpdateBody(body, "At least one task field is required");

	const result = await db.execute(sql`
		update tasks
		set
			assigned_to_user_id = coalesce(${body.assignedToUserId ?? null}, assigned_to_user_id),
			description = coalesce(${body.description ?? null}, description),
			due_date = coalesce(${body.dueDate ?? null}, due_date),
			priority_id = coalesce(${body.priorityId ?? null}, priority_id),
			project_id = coalesce(${body.projectId ?? null}, project_id),
			status_id = coalesce(${body.statusId ?? null}, status_id),
			title = coalesce(${body.title ?? null}, title),
			updated_at = now()
		where id = ${params.taskId}
		returning
			${taskSelect}
	`);

	return requireFound(result.rows[0], "Task not found");
};

export const deleteTaskService = async ({
	params,
}: {
	params: TaskParamsType;
}) => {
	const result = await db.execute(sql`
		delete from tasks
		where id = ${params.taskId}
		returning
			${taskSelect}
	`);

	return requireFound(result.rows[0], "Task not found");
};

export const assignTaskService = async ({
	params,
	body,
}: {
	params: TaskParamsType;
	body: AssignTaskBodyType;
}) => {
	const result = await db.execute(sql`
		update tasks
		set
			assigned_to_user_id = ${body.assignedToUserId},
			updated_at = now()
		where id = ${params.taskId}
		returning
			${taskSelect}
	`);

	return requireFound(result.rows[0], "Task not found");
};

export const completeTaskService = async ({
	params,
}: {
	params: TaskParamsType;
}) => {
	const result = await db.execute(sql`
		update tasks
		set
			completed_at = now(),
			updated_at = now()
		where id = ${params.taskId}
		returning
			${taskSelect}
	`);

	return requireFound(result.rows[0], "Task not found");
};

export const reopenTaskService = async ({
	params,
}: {
	params: TaskParamsType;
}) => {
	const result = await db.execute(sql`
		update tasks
		set
			completed_at = null,
			updated_at = now()
		where id = ${params.taskId}
		returning
			${taskSelect}
	`);

	return requireFound(result.rows[0], "Task not found");
};

export const getTaskLabelsService = async ({
	params,
}: {
	params: TaskParamsType;
}) => {
	const result = await db.execute(sql`
		select
			tl.id as "taskLabelId",
			l.id as "labelId",
			l.name,
			l.color,
			l.created_at as "createdAt"
		from task_labels tl
		inner join labels l
			on l.id = tl.label_id
		where tl.task_id = ${params.taskId}
		order by l.name asc
	`);

	return result.rows;
};

export const addTaskLabelService = async ({
	params,
	body,
}: {
	params: TaskParamsType;
	body: AddTaskLabelBodyType;
}) => {
	const id = crypto.randomUUID();

	const result = await db.execute(sql`
		insert into task_labels (
			id,
			label_id,
			task_id
		)
		values (
			${id},
			${body.labelId},
			${params.taskId}
		)
		on conflict (label_id, task_id) do nothing
		returning
			id,
			label_id as "labelId",
			task_id as "taskId"
	`);

	return requireInserted(result.rows[0], "Task already has this label");
};

export const deleteTaskLabelService = async ({
	params,
}: {
	params: TaskLabelParamsType;
}) => {
	const result = await db.execute(sql`
		delete from task_labels
		where task_id = ${params.taskId}
			and label_id = ${params.labelId}
		returning
			id,
			label_id as "labelId",
			task_id as "taskId"
	`);

	return requireFound(result.rows[0], "Task label not found");
};
