import * as v from "valibot";

export const CreateTaskSchema = v.object({
	title: v.pipe(v.string(), v.trim(), v.minLength(1)),
	description: v.optional(v.string()),
	dueDate: v.optional(v.string()),
	statusId: v.pipe(v.string(), v.trim(), v.minLength(1)),
	priorityId: v.pipe(v.string(), v.trim(), v.minLength(1)),
	projectId: v.pipe(v.string(), v.trim(), v.minLength(1)),
	createdByUserId: v.pipe(v.string(), v.trim(), v.minLength(1)),
	assignedToUserId: v.optional(v.string()),
});

export const UpdateTaskSchema = v.partial(CreateTaskSchema);

export const AssignTaskSchema = v.object({
	assignedToUserId: v.nullable(v.string()),
});

export const AddTaskLabelSchema = v.object({
	labelId: v.pipe(v.string(), v.trim(), v.minLength(1)),
});
