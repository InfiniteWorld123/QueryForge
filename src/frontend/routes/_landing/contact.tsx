import { createFileRoute } from "@tanstack/react-router";

import { Contact } from "#/frontend/components/pages/marketing/contact/contact";

export const Route = createFileRoute("/_landing-layout/contact")({
	component: Contact,
});
