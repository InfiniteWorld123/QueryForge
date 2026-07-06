export const TASK_STATUSES = [
	{
		id: "todo",
		name: "Todo",
		key: "todo",
		position: 1,
	},
	{
		id: "in_progress",
		name: "In Progress",
		key: "in_progress",
		position: 2,
	},
	{
		id: "blocked",
		name: "Blocked",
		key: "blocked",
		position: 3,
	},
	{
		id: "done",
		name: "Done",
		key: "done",
		position: 4,
	},
] as const;

export const TASK_PRIORITIES = [
	{
		id: "low",
		name: "Low",
		key: "low",
		level: 1,
	},
	{
		id: "medium",
		name: "Medium",
		key: "medium",
		level: 2,
	},
	{
		id: "high",
		name: "High",
		key: "high",
		level: 3,
	},
	{
		id: "urgent",
		name: "Urgent",
		key: "urgent",
		level: 4,
	},
] as const;

export type TaskStatusKey = (typeof TASK_STATUSES)[number]["key"];
export type TaskPriorityKey = (typeof TASK_PRIORITIES)[number]["key"];
