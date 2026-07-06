import * as v from "valibot";

export const CreateLabelSchema = v.object({
	name: v.pipe(v.string(), v.trim(), v.minLength(1)),
	color: v.pipe(v.string(), v.trim(), v.minLength(1)),
});

export const UpdateLabelSchema = v.partial(CreateLabelSchema);
