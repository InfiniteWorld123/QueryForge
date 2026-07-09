import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_workspace-layout/tasks")({
	component: RouteComponent,
});

function RouteComponent() {
	return null;
}
