import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_workspace-layout/projects")({
	component: RouteComponent,
});

function RouteComponent() {
	return null;
}
