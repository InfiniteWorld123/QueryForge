import type * as v from "valibot";
import type {
	AddTaskLabelSchema,
	AssignTaskSchema,
	CreateTaskSchema,
	UpdateTaskSchema,
} from "./tasks.validation";

export type CreateTaskBodyType = v.InferInput<typeof CreateTaskSchema>;
export type UpdateTaskBodyType = v.InferInput<typeof UpdateTaskSchema>;
export type AssignTaskBodyType = v.InferInput<typeof AssignTaskSchema>;
export type AddTaskLabelBodyType = v.InferInput<typeof AddTaskLabelSchema>;

export type TaskParamsType = {
	taskId: string;
};

export type TaskLabelParamsType = TaskParamsType & {
	labelId: string;
};

export type GetTasksQueryType = {
	projectId?: string;
	statusId?: string;
	priorityId?: string;
	assignedToUserId?: string;
	labelId?: string;
};
