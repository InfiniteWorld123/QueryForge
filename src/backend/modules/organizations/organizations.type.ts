import type * as v from "valibot";
import type {
	AddOrganizationMemberSchema,
	CreateOrganizationSchema,
	UpdateOrganizationSchema,
} from "./organizations.validation";

export type CreateOrganizationBodyType = v.InferInput<
	typeof CreateOrganizationSchema
>;
export type UpdateOrganizationBodyType = v.InferInput<
	typeof UpdateOrganizationSchema
>;
export type AddOrganizationMemberBodyType = v.InferInput<
	typeof AddOrganizationMemberSchema
>;

export type OrganizationParamsType = {
	organizationId: string;
};

export type OrganizationMemberParamsType = OrganizationParamsType & {
	userId: string;
};
