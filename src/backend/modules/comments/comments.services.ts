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
	void params;
	return [];
};

export const createTaskCommentService = async ({
	params,
	body,
}: {
	params: TaskCommentsParamsType;
	body: CreateCommentBodyType;
}) => {
	void params;
	void body;
	return null;
};

export const updateCommentService = async ({
	params,
	body,
}: {
	params: CommentParamsType;
	body: UpdateCommentBodyType;
}) => {
	void params;
	void body;
	return null;
};

export const deleteCommentService = async ({
	params,
}: {
	params: CommentParamsType;
}) => {
	void params;
	return null;
};
