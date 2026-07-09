import { Button } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { AuthCard, Field } from "./sections/auth-ui";

export function ForgotPassword() {
	return (
		<AuthCard
			title="Reset your password"
			description="Enter the email tied to your account and we'll send a reset link."
			footer={
				<Link
					to="/sign-in"
					className="inline-flex items-center gap-1.5 font-medium text-muted hover:text-accent"
				>
					<ArrowLeft className="size-4" />
					Back to sign in
				</Link>
			}
		>
			<form
				className="flex flex-col gap-5"
				onSubmit={(e) => e.preventDefault()}
			>
				<Field
					label="Email"
					type="email"
					placeholder="you@company.com"
					autoComplete="email"
					isRequired
				/>
				<Button
					type="submit"
					variant="primary"
					size="lg"
					fullWidth
					className="rounded-xl"
				>
					Send reset link
				</Button>
			</form>
		</AuthCard>
	);
}
