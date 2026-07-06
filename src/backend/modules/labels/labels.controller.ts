import * as v from "valibot";
import { HttpStatusCode } from "#/backend/shared/http";
import { responseOk } from "#/backend/shared/response";
import {
	createLabelService,
	deleteLabelService,
	getLabelsService,
	updateLabelService,
} from "./labels.services";
import type {
	CreateLabelBodyType,
	LabelParamsType,
	UpdateLabelBodyType,
} from "./labels.type";
import { CreateLabelSchema, UpdateLabelSchema } from "./labels.validation";

export const getLabels = async () => {
	const result = await getLabelsService();
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const createLabel = async ({ body }: { body: CreateLabelBodyType }) => {
	const parsedBody = v.parse(CreateLabelSchema, body);
	const result = await createLabelService({ body: parsedBody });
	return responseOk({ status: HttpStatusCode.CREATED, data: result });
};

export const updateLabel = async ({
	params,
	body,
}: {
	params: LabelParamsType;
	body: UpdateLabelBodyType;
}) => {
	const parsedBody = v.parse(UpdateLabelSchema, body);
	const result = await updateLabelService({ params, body: parsedBody });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const deleteLabel = async ({ params }: { params: LabelParamsType }) => {
	const result = await deleteLabelService({ params });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};
