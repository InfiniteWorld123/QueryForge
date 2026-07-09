import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_workspace-layout/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return null;
}
