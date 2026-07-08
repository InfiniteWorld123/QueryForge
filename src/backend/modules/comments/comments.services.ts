import { sql } from "drizzle-orm";
import { db } from "#/backend/db";
import { requireCreated, requireFound } from "#/backend/shared/service-utils";
import type {
	CommentParamsType,
	CreateCommentBodyType,
	TaskCommentsParamsType,
	UpdateCommentBodyType,
} from "./comments.type";

export const getTaskCommentsService = async ({
	params,
}: {
	params: TaskCommentsParamsType;
}) => {
	const result = await db.execute(sql`
		select
			c.id,
			c.body,
			c.task_id as "taskId",
			c.created_at as "createdAt",
			c.updated_at as "updatedAt",
			u.id as "userId",
			u.name as "userName",
			u.email as "userEmail",
			u.image as "userImage"
		from comments c
		join "user" u
			on u.id = c.user_id
		where c.task_id = ${params.taskId}
		order by c.created_at asc
	`);

	return result.rows;
};

export const createTaskCommentService = async ({
	params,
	body,
}: {
	params: TaskCommentsParamsType;
	body: CreateCommentBodyType;
}) => {
	const id = crypto.randomUUID();

	const result = await db.execute(sql`
		insert into comments (
			id,
			body,
			task_id,
			user_id
		)
		values (
			${id},
			${body.body},
			${params.taskId},
			${body.userId}
		)
		returning
			id,
			body,
			task_id as "taskId",
			user_id as "userId",
			created_at as "createdAt",
			updated_at as "updatedAt"
	`);

	return requireCreated(result.rows[0], "Comment could not be created");
};

export const updateCommentService = async ({
	params,
	body,
}: {
	params: CommentParamsType;
	body: UpdateCommentBodyType;
}) => {
	const result = await db.execute(sql`
		update comments
		set
			body = ${body.body},
			updated_at = now()
		where id = ${params.commentId}
		returning
			id,
			body,
			task_id as "taskId",
			user_id as "userId",
			created_at as "createdAt",
			updated_at as "updatedAt"
	`);

	return requireFound(result.rows[0], "Comment not found");
};

export const deleteCommentService = async ({
	params,
}: {
	params: CommentParamsType;
}) => {
	const result = await db.execute(sql`
		delete from comments
		where id = ${params.commentId}
		returning
			id,
			body,
			task_id as "taskId",
			user_id as "userId",
			created_at as "createdAt",
			updated_at as "updatedAt"
	`);

	return requireFound(result.rows[0], "Comment not found");
};
