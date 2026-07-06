import * as v from "valibot";
import { HttpStatusCode } from "#/backend/shared/http";
import { responseOk } from "#/backend/shared/response";
import {
	createTaskCommentService,
	deleteCommentService,
	getTaskCommentsService,
	updateCommentService,
} from "./comments.services";
import type {
	CommentParamsType,
	CreateCommentBodyType,
	TaskCommentsParamsType,
	UpdateCommentBodyType,
} from "./comments.type";
import {
	CreateCommentSchema,
	UpdateCommentSchema,
} from "./comments.validation";

export const getTaskComments = async ({
	params,
}: {
	params: TaskCommentsParamsType;
}) => {
	const result = await getTaskCommentsService({ params });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const createTaskComment = async ({
	params,
	body,
}: {
	params: TaskCommentsParamsType;
	body: CreateCommentBodyType;
}) => {
	const parsedBody = v.parse(CreateCommentSchema, body);
	const result = await createTaskCommentService({ params, body: parsedBody });
	return responseOk({ status: HttpStatusCode.CREATED, data: result });
};

export const updateComment = async ({
	params,
	body,
}: {
	params: CommentParamsType;
	body: UpdateCommentBodyType;
}) => {
	const parsedBody = v.parse(UpdateCommentSchema, body);
	const result = await updateCommentService({ params, body: parsedBody });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const deleteComment = async ({
	params,
}: {
	params: CommentParamsType;
}) => {
	const result = await deleteCommentService({ params });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};
