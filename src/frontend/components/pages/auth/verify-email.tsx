import { Button, buttonVariants, cn } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";

export function VerifyEmail() {
	return (
		<div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-overlay">
			<div className="flex flex-col items-center px-8 pt-8 text-center">
				<span className="grid size-14 place-items-center rounded-2xl bg-accent-soft text-accent-soft-foreground">
					<MailCheck className="size-7" />
				</span>
				<h1 className="mt-5 font-serif text-3xl tracking-tight text-foreground">
					Verify your email
				</h1>
				<p className="mt-2 text-sm text-muted">
					We sent a 6-digit code to{" "}
					<span className="font-medium text-foreground">you@company.com</span>.
					Enter it below to continue.
				</p>
			</div>

			<form
				className="flex flex-col gap-6 p-8"
				onSubmit={(e) => e.preventDefault()}
			>
				<div className="flex justify-center gap-2 sm:gap-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<input
							// biome-ignore lint/suspicious/noArrayIndexKey: fixed static code cells
							key={i}
							inputMode="numeric"
							maxLength={1}
							aria-label={`Digit ${i + 1}`}
							className="size-12 rounded-lg border border-border bg-field text-center font-mono text-lg text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
						/>
					))}
				</div>

				<Button
					type="submit"
					variant="primary"
					size="lg"
					fullWidth
					className="rounded-xl"
				>
					Verify email
				</Button>

				<p className="text-center text-sm text-muted">
					Didn't get a code?{" "}
					<button
						type="button"
						className="font-medium text-accent hover:underline"
					>
						Resend
					</button>
				</p>
			</form>

			<div className="border-t border-border/70 bg-surface-secondary/40 px-8 py-5 text-center">
				<Link
					to="/sign-in"
					className={cn(
						buttonVariants({ variant: "ghost", size: "sm" }),
						"rounded-lg",
					)}
				>
					Back to sign in
				</Link>
			</div>
		</div>
	);
}
