import type {
	AddOrganizationMemberBodyType,
	CreateOrganizationBodyType,
	OrganizationMemberParamsType,
	OrganizationParamsType,
	UpdateOrganizationBodyType,
} from "./organizations.type";

export const getOrganizationsService = async () => {
	return [];
};

export const createOrganizationService = async ({
	body,
}: {
	body: CreateOrganizationBodyType;
}) => {
	void body;
	return null;
};

export const getOrganizationService = async ({
	params,
}: {
	params: OrganizationParamsType;
}) => {
	void params;
	return null;
};

export const updateOrganizationService = async ({
	params,
	body,
}: {
	params: OrganizationParamsType;
	body: UpdateOrganizationBodyType;
}) => {
	void params;
	void body;
	return null;
};

export const deleteOrganizationService = async ({
	params,
}: {
	params: OrganizationParamsType;
}) => {
	void params;
	return null;
};

export const getOrganizationMembersService = async ({
	params,
}: {
	params: OrganizationParamsType;
}) => {
	void params;
	return [];
};

export const addOrganizationMemberService = async ({
	params,
	body,
}: {
	params: OrganizationParamsType;
	body: AddOrganizationMemberBodyType;
}) => {
	void params;
	void body;
	return null;
};

export const deleteOrganizationMemberService = async ({
	params,
}: {
	params: OrganizationMemberParamsType;
}) => {
	void params;
	return null;
};
