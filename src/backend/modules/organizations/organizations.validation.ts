import * as v from "valibot";

export const CreateOrganizationSchema = v.object({
	name: v.pipe(v.string(), v.trim(), v.minLength(1)),
	slug: v.pipe(v.string(), v.trim(), v.minLength(1)),
	description: v.optional(v.string()),
});

export const UpdateOrganizationSchema = v.partial(CreateOrganizationSchema);

export const AddOrganizationMemberSchema = v.object({
	userId: v.pipe(v.string(), v.trim(), v.minLength(1)),
});
