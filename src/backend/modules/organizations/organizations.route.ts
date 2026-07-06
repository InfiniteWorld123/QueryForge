import { Elysia } from "elysia";
import {
	addOrganizationMember,
	createOrganization,
	deleteOrganization,
	deleteOrganizationMember,
	getOrganization,
	getOrganizationMembers,
	getOrganizations,
	updateOrganization,
} from "./organizations.controller";
import {
	AddOrganizationMemberSchema,
	CreateOrganizationSchema,
	UpdateOrganizationSchema,
} from "./organizations.validation";

export const organizationsRoutes = new Elysia({ prefix: "/organizations" });

organizationsRoutes
	.get("/", getOrganizations)
	.post("/", createOrganization, { body: CreateOrganizationSchema })
	.get("/:organizationId", getOrganization)
	.patch("/:organizationId", updateOrganization, {
		body: UpdateOrganizationSchema,
	})
	.delete("/:organizationId", deleteOrganization)
	.get("/:organizationId/members", getOrganizationMembers)
	.post("/:organizationId/members", addOrganizationMember, {
		body: AddOrganizationMemberSchema,
	})
	.delete("/:organizationId/members/:userId", deleteOrganizationMember);
