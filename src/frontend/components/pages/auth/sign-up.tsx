import { Button } from "@heroui/react";
import { Link } from "@tanstack/react-router";

import {
	AuthCard,
	Field,
	OrDivider,
	PasswordField,
	SocialAuth,
} from "./sections/auth-ui";

export function SignUp() {
	return (
		<AuthCard
			title="Create your account"
			description="Start tracking work in minutes. Free while in early access."
			footer={
				<>
					Already have an account?{" "}
					<Link
						to="/sign-in"
						className="font-medium text-accent hover:underline"
					>
						Sign in
					</Link>
				</>
			}
		>
			<form
				className="flex flex-col gap-5"
				onSubmit={(e) => e.preventDefault()}
			>
				<SocialAuth verb="Sign up" />
				<OrDivider label="or sign up with email" />
				<Field
					label="Full name"
					placeholder="Ada Lovelace"
					autoComplete="name"
					isRequired
				/>
				<Field
					label="Email"
					type="email"
					placeholder="you@company.com"
					autoComplete="email"
					isRequired
				/>
				<PasswordField
					autoComplete="new-password"
					description="At least 8 characters."
				/>
				<Button
					type="submit"
					variant="primary"
					size="lg"
					fullWidth
					className="mt-1 rounded-xl"
				>
					Create account
				</Button>
				<p className="text-center text-xs text-muted">
					By continuing you agree to our{" "}
					<Link to="/" className="text-foreground/80 hover:text-accent">
						Terms
					</Link>{" "}
					and{" "}
					<Link to="/" className="text-foreground/80 hover:text-accent">
						Privacy Policy
					</Link>
					.
				</p>
			</form>
		</AuthCard>
	);
}
