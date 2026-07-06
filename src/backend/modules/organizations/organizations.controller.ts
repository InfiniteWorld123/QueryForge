import * as v from "valibot";
import { HttpStatusCode } from "#/backend/shared/http";
import { responseOk } from "#/backend/shared/response";
import {
	addOrganizationMemberService,
	createOrganizationService,
	deleteOrganizationMemberService,
	deleteOrganizationService,
	getOrganizationMembersService,
	getOrganizationService,
	getOrganizationsService,
	updateOrganizationService,
} from "./organizations.services";
import type {
	AddOrganizationMemberBodyType,
	CreateOrganizationBodyType,
	OrganizationMemberParamsType,
	OrganizationParamsType,
	UpdateOrganizationBodyType,
} from "./organizations.type";
import {
	AddOrganizationMemberSchema,
	CreateOrganizationSchema,
	UpdateOrganizationSchema,
} from "./organizations.validation";

export const getOrganizations = async () => {
	const result = await getOrganizationsService();
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const createOrganization = async ({
	body,
}: {
	body: CreateOrganizationBodyType;
}) => {
	const parsedBody = v.parse(CreateOrganizationSchema, body);
	const result = await createOrganizationService({ body: parsedBody });
	return responseOk({ status: HttpStatusCode.CREATED, data: result });
};

export const getOrganization = async ({
	params,
}: {
	params: OrganizationParamsType;
}) => {
	const result = await getOrganizationService({ params });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const updateOrganization = async ({
	params,
	body,
}: {
	params: OrganizationParamsType;
	body: UpdateOrganizationBodyType;
}) => {
	const parsedBody = v.parse(UpdateOrganizationSchema, body);
	const result = await updateOrganizationService({ params, body: parsedBody });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const deleteOrganization = async ({
	params,
}: {
	params: OrganizationParamsType;
}) => {
	const result = await deleteOrganizationService({ params });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const getOrganizationMembers = async ({
	params,
}: {
	params: OrganizationParamsType;
}) => {
	const result = await getOrganizationMembersService({ params });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};

export const addOrganizationMember = async ({
	params,
	body,
}: {
	params: OrganizationParamsType;
	body: AddOrganizationMemberBodyType;
}) => {
	const parsedBody = v.parse(AddOrganizationMemberSchema, body);
	const result = await addOrganizationMemberService({
		params,
		body: parsedBody,
	});
	return responseOk({ status: HttpStatusCode.CREATED, data: result });
};

export const deleteOrganizationMember = async ({
	params,
}: {
	params: OrganizationMemberParamsType;
}) => {
	const result = await deleteOrganizationMemberService({ params });
	return responseOk({ status: HttpStatusCode.OK, data: result });
};
