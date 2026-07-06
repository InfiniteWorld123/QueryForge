import type { ProjectReportParamsType } from "./reports.type";

export const getTasksByStatusReportService = async () => {
	return [];
};

export const getTasksByProjectReportService = async () => {
	return [];
};

export const getTasksByAssigneeReportService = async () => {
	return [];
};

export const getOverdueTasksReportService = async () => {
	return [];
};

export const getLabelUsageReportService = async () => {
	return [];
};

export const getProjectHealthReportService = async ({
	params,
}: {
	params?: ProjectReportParamsType;
}) => {
	void params;
	return [];
};
