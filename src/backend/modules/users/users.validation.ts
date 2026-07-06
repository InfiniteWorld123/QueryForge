import * as v from "valibot";

export const UpdateCurrentUserSchema = v.object({
	name: v.optional(v.pipe(v.string(), v.trim(), v.minLength(1))),
	image: v.optional(v.pipe(v.string(), v.url())),
});
