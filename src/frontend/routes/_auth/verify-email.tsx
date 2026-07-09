import { createFileRoute } from "@tanstack/react-router";

import { VerifyEmail } from "#/frontend/components/pages/auth/verify-email";

export const Route = createFileRoute("/_auth-layout/verify-email")({
	component: VerifyEmail,
});
