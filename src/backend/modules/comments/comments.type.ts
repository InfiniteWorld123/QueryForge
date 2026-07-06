import type * as v from "valibot";
import type {
	CreateCommentSchema,
	UpdateCommentSchema,
} from "./comments.validation";

export type CreateCommentBodyType = v.InferInput<typeof CreateCommentSchema>;
export type UpdateCommentBodyType = v.InferInput<typeof UpdateCommentSchema>;

export type TaskCommentsParamsType = {
	taskId: string;
};

export type CommentParamsType = {
	commentId: string;
};
