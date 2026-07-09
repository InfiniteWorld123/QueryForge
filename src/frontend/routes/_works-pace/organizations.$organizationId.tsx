import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_workspace-layout/organizations/$organizationId",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return null;
}
