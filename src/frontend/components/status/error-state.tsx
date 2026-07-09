import { Button, buttonVariants, cn } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import { RotateCw, TriangleAlert } from "lucide-react";

interface ErrorStateProps {
	error?: Error;
	reset?: () => void;
}

/** Router default error component. Renders the message with recover / home actions. */
export function ErrorState({ error, reset }: ErrorStateProps) {
	return (
		<div className="grid min-h-[70vh] place-items-center px-6 py-16">
			<div className="flex max-w-md flex-col items-center text-center">
				<span className="grid size-12 place-items-center rounded-xl bg-danger-soft text-danger">
					<TriangleAlert className="size-6" />
				</span>
				<h1 className="mt-6 font-serif text-3xl text-foreground">
					Something went wrong
				</h1>
				<p className="mt-3 text-sm text-muted">
					An unexpected error interrupted this page. You can try again, or head
					back to safe ground.
				</p>
				{error?.message && (
					<pre className="mt-5 w-full overflow-x-auto rounded-lg border border-border bg-surface-secondary p-3 text-left font-mono text-xs text-muted">
						{error.message}
					</pre>
				)}
				<div className="mt-7 flex items-center gap-3">
					{reset && (
						<Button
							variant="primary"
							size="md"
							onPress={reset}
							className="rounded-lg"
						>
							<RotateCw className="size-4" />
							Try again
						</Button>
					)}
					<Link
						to="/"
						className={cn(
							buttonVariants({ variant: "outline", size: "md" }),
							"rounded-lg",
						)}
					>
						Back home
					</Link>
				</div>
			</div>
		</div>
	);
}
