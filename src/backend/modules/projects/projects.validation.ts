import * as v from "valibot";

export const CreateProjectSchema = v.object({
	name: v.pipe(v.string(), v.trim(), v.minLength(1)),
	description: v.optional(v.string()),
	organizationId: v.pipe(v.string(), v.trim(), v.minLength(1)),
});

export const UpdateProjectSchema = v.partial(
	v.object({
		name: v.pipe(v.string(), v.trim(), v.minLength(1)),
		description: v.optional(v.string()),
	}),
);

export const AddProjectMemberSchema = v.object({
	userId: v.pipe(v.string(), v.trim(), v.minLength(1)),
});
