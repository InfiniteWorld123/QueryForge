import { HttpStatusCode } from "#/backend/shared/http";
import { responseOk } from "#/backend/shared/response";
import {
	getLabelUsageReportService,
	getOverdueTasksReportService,
	getProjectHealthReportService,
	getTasksByAssigneeReportService,
	getTasksByProjectReportService,
	getTasksByStatusReportService,
} from "./reports.services";
import type { ProjectReportParamsType } from "./reports.type";

export const getTasksByStatusReport = async () => {
	const result = await getTasksByStatusReportService();
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const getTasksByProjectReport = async () => {
	const result = await getTasksByProjectReportService();
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const getTasksByAssigneeReport = async () => {
	const result = await getTasksByAssigneeReportService();
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const getOverdueTasksReport = async () => {
	const result = await getOverdueTasksReportService();
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const getLabelUsageReport = async () => {
	const result = await getLabelUsageReportService();
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const getProjectHealthReport = async () => {
	const result = await getProjectHealthReportService({});
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const getProjectHealthByProjectReport = async ({
	params,
}: {
	params: ProjectReportParamsType;
}) => {
	const result = await getProjectHealthReportService({ params });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};
