import { buttonVariants, cn } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Compass } from "lucide-react";

/** Router default not-found component (404). */
export function NotFound() {
	return (
		<div className="grid min-h-[70vh] place-items-center px-6 py-16">
			<div className="flex max-w-md flex-col items-center text-center">
				<span className="grid size-12 place-items-center rounded-xl bg-surface-secondary text-muted">
					<Compass className="size-6" />
				</span>
				<p className="mt-6 font-mono text-sm tracking-widest text-accent uppercase">
					404
				</p>
				<h1 className="mt-2 font-serif text-3xl text-foreground">
					This page went missing
				</h1>
				<p className="mt-3 text-sm text-muted">
					The page you're looking for doesn't exist or may have been moved.
				</p>
				<Link
					to="/"
					className={cn(
						buttonVariants({ variant: "primary", size: "md" }),
						"mt-7 rounded-lg",
					)}
				>
					<ArrowLeft className="size-4" />
					Back home
				</Link>
			</div>
		</div>
	);
}
