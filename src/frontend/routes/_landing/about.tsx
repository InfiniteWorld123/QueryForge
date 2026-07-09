import { createFileRoute } from "@tanstack/react-router";

import { About } from "#/frontend/components/pages/marketing/about/about";

export const Route = createFileRoute("/_landing-layout/about")({
	component: About,
});
