import { db } from "#/backend/db";
import { sql } from "drizzle-orm";
import type {
	AddTaskLabelBodyType,
	AssignTaskBodyType,
	CreateTaskBodyType,
	GetTasksQueryType,
	TaskLabelParamsType,
	TaskParamsType,
	UpdateTaskBodyType,
} from "./tasks.type";

export const getTasksService = async ({
	query,
}: {
	query?: GetTasksQueryType;
}) => {
	const result = await db.execute(sql`
		select * 
		from tasks
		where assigned_to_user_id = ${query?.assignedToUserId} and
		where label_id = ${query?.labelId} and
		where priority_id = ${query?.priorityId} and
		where project_id = ${query?.projectId} and
		where status_id = ${query?.statusId}
	`);

	return result.rows ?? null;
};

export const createTaskService = async ({
	body,
}: {
	body: CreateTaskBodyType;
}) => {
	const id = crypto.randomUUID();

	const result = await db.execute(sql`
		insert into comments (
			id,
			assigned_to_user_id,
			description,
			dueDate,
			priorityId,
			projectId,
			statusId,
			title
		)
		values (
			${id},
			${body.assignedToUserId},
			${body.description},
			${body.dueDate},
			${body.priorityId},
			${body.projectId},
			${body.statusId},
			${body.title}
		)
		returning
			id 
			title 
			description 
			due_date 
			completed_at 
			created_at 
			updated_at 
			status_id
			priority_id
			project_id
			created_by_user_id
			assigned_to_user_id
	`);

	return result.rows[0] ?? null;
};

export const getTaskService = async ({
	params,
}: {
	params: TaskParamsType;
}) => {
	const result = await db.execute(sql`
		select * 
		from tasks
		where id = ${params.taskId}
	`);

	return result.rows ?? null;
};

export const updateTaskService = async ({
	params,
	body,
}: {
	params: TaskParamsType;
	body: UpdateTaskBodyType;
}) => {
	const result = await db.execute(sql`
		update tasks
		set
			assigned_to_user_id = coalesce(${body.assignedToUserId ?? null}, assigned_to_user_id)
			description = coalesce(${body.description ?? null}, description)
			dueDate = coalesce(${body.dueDate ?? null}, dueDate)
			priorityId = coalesce(${body.priorityId ?? null}, priorityId)
			projectId = coalesce(${body.projectId ?? null}, projectId)
			statusId = coalesce(${body.statusId ?? null}, statusId)
			title = coalesce(${body.title ?? null}, title)
		where id = ${params.taskId}
		returning
			id 
			title 
			description 
			due_date 
			completed_at 
			created_at 
			updated_at 
			status_id
			priority_id
			project_id
			created_by_user_id
			assigned_to_user_id
	`);

	return result.rows[0] ?? null;
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
			id 
			title 
			description 
			due_date 
			completed_at 
			created_at 
			updated_at 
			status_id
			priority_id
			project_id
			created_by_user_id
			assigned_to_user_id
	`);

	return result.rows[0] ?? null;
};

export const assignTaskService = async ({
	params,
	body,
}: {
	params: TaskParamsType;
	body: AssignTaskBodyType;
}) => {
	void params;
	void body;
	
	const result = await db.execute(sql`
		update tasks
		set
			assigned_to_user_id = coalesce(${body.assignedToUserId ?? null}, assigned_to_user_id)
		where id = ${params.taskId}
		returning
			id 
			title 
			description 
			due_date 
			completed_at 
			created_at 
			updated_at 
			status_id
			priority_id
			project_id
			created_by_user_id
			assigned_to_user_id
	`);

	return result.rows[0] ?? null;
};

export const completeTaskService = async ({
	params,
}: {
	params: TaskParamsType;
}) => {
	const result = await db.execute(sql`
		update tasks
		set
			completed_at = ${Date.now}
		where id = ${params.taskId}
		returning
			id 
			title 
			description 
			due_date 
			completed_at 
			created_at 
			updated_at 
			status_id
			priority_id
			project_id
			created_by_user_id
			assigned_to_user_id
	`);

	return result.rows[0] ?? null;
};

export const reopenTaskService = async ({
	params,
}: {
	params: TaskParamsType;
}) => {
	void params;
	return null;
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

	return result.rows[0] ?? null;
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

	return result.rows[0] ?? null;
};
