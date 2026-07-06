import * as v from "valibot";

export const CreateCommentSchema = v.object({
	body: v.pipe(v.string(), v.trim(), v.minLength(1)),
});

export const UpdateCommentSchema = CreateCommentSchema;
