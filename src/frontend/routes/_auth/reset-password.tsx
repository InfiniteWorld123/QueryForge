import { createFileRoute } from "@tanstack/react-router";

import { ResetPassword } from "#/frontend/components/pages/auth/reset-password";

export const Route = createFileRoute("/_auth-layout/reset-password")({
	component: ResetPassword,
});
