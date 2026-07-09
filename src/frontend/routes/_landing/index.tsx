import { createFileRoute } from "@tanstack/react-router";

import { Landing } from "#/frontend/components/pages/marketing/landing/landing";

export const Route = createFileRoute("/_landing-layout/")({
	component: Landing,
});
