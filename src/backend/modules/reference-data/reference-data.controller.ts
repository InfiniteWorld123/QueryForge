import { HttpStatusCode } from "#/backend/shared/http";
import { responseOk } from "#/backend/shared/response";
import {
	getPrioritiesService,
	getStatusesService,
} from "./reference-data.services";

export const getStatuses = async () => {
	const result = await getStatusesService();
	return responseOk({
		status: HttpStatusCode.OK,
		data: result,
		message: "statuses fetched successfully",
	});
};

export const getPriorities = async () => {
	const result = await getPrioritiesService();
	return responseOk({
		status: HttpStatusCode.OK,
		data: result,
		message: "priorities fetched successfully",
	});
};
