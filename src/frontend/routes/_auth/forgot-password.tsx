import { createFileRoute } from "@tanstack/react-router";

import { ForgotPassword } from "#/frontend/components/pages/auth/forgot-password";

export const Route = createFileRoute("/_auth-layout/forgot-password")({
	component: ForgotPassword,
});
