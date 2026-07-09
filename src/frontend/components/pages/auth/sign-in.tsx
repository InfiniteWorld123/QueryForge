import { Button } from "@heroui/react";
import { Link } from "@tanstack/react-router";

import {
	AuthCard,
	Field,
	OrDivider,
	PasswordField,
	SocialAuth,
} from "./sections/auth-ui";

export function SignIn() {
	return (
		<AuthCard
			title="Welcome back"
			description="Sign in to your QueryForge workspace."
			footer={
				<>
					Don't have an account?{" "}
					<Link
						to="/sign-up"
						className="font-medium text-accent hover:underline"
					>
						Create one
					</Link>
				</>
			}
		>
			<form
				className="flex flex-col gap-5"
				onSubmit={(e) => e.preventDefault()}
			>
				<SocialAuth />
				<OrDivider label="or continue with email" />
				<Field
					label="Email"
					type="email"
					placeholder="you@company.com"
					autoComplete="email"
					isRequired
				/>
				<PasswordField
					action={
						<Link
							to="/forgot-password"
							className="text-xs font-medium text-muted hover:text-accent"
						>
							Forgot password?
						</Link>
					}
				/>
				<Button
					type="submit"
					variant="primary"
					size="lg"
					fullWidth
					className="mt-1 rounded-xl"
				>
					Sign in
				</Button>
			</form>
		</AuthCard>
	);
}
