import { Spinner } from "@heroui/react";

interface LoadingProps {
	label?: string;
	/** Fill the viewport (route-level) rather than the local container. */
	fullscreen?: boolean;
}

/** Neutral pending state used as the router's default loading component. */
export function Loading({
	label = "Loading",
	fullscreen = false,
}: LoadingProps) {
	return (
		<div
			className={
				fullscreen
					? "grid min-h-screen place-items-center bg-background"
					: "grid min-h-[60vh] place-items-center"
			}
		>
			<div className="flex flex-col items-center gap-4 text-muted">
				<Spinner size="lg" />
				<p className="font-mono text-xs tracking-widest uppercase">{label}</p>
			</div>
		</div>
	);
}
