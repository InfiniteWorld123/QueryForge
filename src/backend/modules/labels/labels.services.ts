import type {
	CreateLabelBodyType,
	LabelParamsType,
	UpdateLabelBodyType,
} from "./labels.type";

export const getLabelsService = async () => {
	return [];
};

export const createLabelService = async ({
	body,
}: {
	body: CreateLabelBodyType;
}) => {
	void body;
	return null;
};

export const updateLabelService = async ({
	params,
	body,
}: {
	params: LabelParamsType;
	body: UpdateLabelBodyType;
}) => {
	void params;
	void body;
	return null;
};

export const deleteLabelService = async ({
	params,
}: {
	params: LabelParamsType;
}) => {
	void params;
	return null;
};
