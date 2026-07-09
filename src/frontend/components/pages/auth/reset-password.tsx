import { Button } from "@heroui/react";
import { Link } from "@tanstack/react-router";

import { AuthCard, PasswordField } from "./sections/auth-ui";

export function ResetPassword() {
	return (
		<AuthCard
			title="Set a new password"
			description="Choose a strong password you don't use anywhere else."
			footer={
				<>
					Remembered it?{" "}
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
				<PasswordField
					label="New password"
					autoComplete="new-password"
					description="At least 8 characters."
				/>
				<PasswordField label="Confirm password" autoComplete="new-password" />
				<Button
					type="submit"
					variant="primary"
					size="lg"
					fullWidth
					className="mt-1 rounded-xl"
				>
					Update password
				</Button>
			</form>
		</AuthCard>
	);
}
