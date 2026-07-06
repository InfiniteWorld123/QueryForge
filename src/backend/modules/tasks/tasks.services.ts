import type {
	AddTaskLabelBodyType,
	AssignTaskBodyType,
	CreateTaskBodyType,
	GetTasksQueryType,
	TaskLabelParamsType,
	TaskParamsType,
	UpdateTaskBodyType,
} from "./tasks.type";

export const getTasksService = async ({
	query,
}: {
	query?: GetTasksQueryType;
}) => {
	void query;
	return [];
};

export const createTaskService = async ({
	body,
}: {
	body: CreateTaskBodyType;
}) => {
	void body;
	return null;
};

export const getTaskService = async ({
	params,
}: {
	params: TaskParamsType;
}) => {
	void params;
	return null;
};

export const updateTaskService = async ({
	params,
	body,
}: {
	params: TaskParamsType;
	body: UpdateTaskBodyType;
}) => {
	void params;
	void body;
	return null;
};

export const deleteTaskService = async ({
	params,
}: {
	params: TaskParamsType;
}) => {
	void params;
	return null;
};

export const assignTaskService = async ({
	params,
	body,
}: {
	params: TaskParamsType;
	body: AssignTaskBodyType;
}) => {
	void params;
	void body;
	return null;
};

export const completeTaskService = async ({
	params,
}: {
	params: TaskParamsType;
}) => {
	void params;
	return null;
};

export const reopenTaskService = async ({
	params,
}: {
	params: TaskParamsType;
}) => {
	void params;
	return null;
};

export const getTaskLabelsService = async ({
	params,
}: {
	params: TaskParamsType;
}) => {
	void params;
	return [];
};

export const addTaskLabelService = async ({
	params,
	body,
}: {
	params: TaskParamsType;
	body: AddTaskLabelBodyType;
}) => {
	void params;
	void body;
	return null;
};

export const deleteTaskLabelService = async ({
	params,
}: {
	params: TaskLabelParamsType;
}) => {
	void params;
	return null;
};
