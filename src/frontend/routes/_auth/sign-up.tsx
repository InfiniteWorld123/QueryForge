import { createFileRoute } from "@tanstack/react-router";

import { SignUp } from "#/frontend/components/pages/auth/sign-up";

export const Route = createFileRoute("/_auth-layout/sign-up")({
	component: SignUp,
});
