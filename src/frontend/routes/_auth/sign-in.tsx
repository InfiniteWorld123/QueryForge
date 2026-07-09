import { createFileRoute } from "@tanstack/react-router";

import { SignIn } from "#/frontend/components/pages/auth/sign-in";

export const Route = createFileRoute("/_auth-layout/sign-in")({
	component: SignIn,
});
