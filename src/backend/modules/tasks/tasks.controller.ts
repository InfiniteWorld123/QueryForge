import * as v from "valibot";
import { HttpStatusCode } from "#/backend/shared/http";
import { responseOk } from "#/backend/shared/response";
import {
	addTaskLabelService,
	assignTaskService,
	completeTaskService,
	createTaskService,
	deleteTaskLabelService,
	deleteTaskService,
	getTaskLabelsService,
	getTaskService,
	getTasksService,
	reopenTaskService,
	updateTaskService,
} from "./tasks.services";
import type {
	AddTaskLabelBodyType,
	AssignTaskBodyType,
	CreateTaskBodyType,
	GetTasksQueryType,
	TaskLabelParamsType,
	TaskParamsType,
	UpdateTaskBodyType,
} from "./tasks.type";
import {
	AddTaskLabelSchema,
	AssignTaskSchema,
	CreateTaskSchema,
	UpdateTaskSchema,
} from "./tasks.validation";

export const getTasks = async ({ query }: { query?: GetTasksQueryType }) => {
	const result = await getTasksService({ query });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const createTask = async ({ body }: { body: CreateTaskBodyType }) => {
	const parsedBody = v.parse(CreateTaskSchema, body);
	const result = await createTaskService({ body: parsedBody });
	return responseOk({ status: HttpStatusCode.CREATED, data: result });
};

export const getTask = async ({ params }: { params: TaskParamsType }) => {
	const result = await getTaskService({ params });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const updateTask = async ({
	params,
	body,
}: {
	params: TaskParamsType;
	body: UpdateTaskBodyType;
}) => {
	const parsedBody = v.parse(UpdateTaskSchema, body);
	const result = await updateTaskService({ params, body: parsedBody });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const deleteTask = async ({ params }: { params: TaskParamsType }) => {
	const result = await deleteTaskService({ params });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const assignTask = async ({
	params,
	body,
}: {
	params: TaskParamsType;
	body: AssignTaskBodyType;
}) => {
	const parsedBody = v.parse(AssignTaskSchema, body);
	const result = await assignTaskService({ params, body: parsedBody });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const completeTask = async ({ params }: { params: TaskParamsType }) => {
	const result = await completeTaskService({ params });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const reopenTask = async ({ params }: { params: TaskParamsType }) => {
	const result = await reopenTaskService({ params });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const getTaskLabels = async ({ params }: { params: TaskParamsType }) => {
	const result = await getTaskLabelsService({ params });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const addTaskLabel = async ({
	params,
	body,
}: {
	params: TaskParamsType;
	body: AddTaskLabelBodyType;
}) => {
	const parsedBody = v.parse(AddTaskLabelSchema, body);
	const result = await addTaskLabelService({ params, body: parsedBody });
	return responseOk({ status: HttpStatusCode.CREATED, data: result });
};

export const deleteTaskLabel = async ({
	params,
}: {
	params: TaskLabelParamsType;
}) => {
	const result = await deleteTaskLabelService({ params });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};
