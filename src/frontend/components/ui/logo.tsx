import { cn } from "@heroui/react";

interface LogoProps {
	className?: string;
	/** Hide the wordmark, showing only the mark. */
	markOnly?: boolean;
	size?: "sm" | "md" | "lg";
}

const wordmarkSize: Record<NonNullable<LogoProps["size"]>, string> = {
	sm: "text-base",
	md: "text-lg",
	lg: "text-xl",
};

const markSize: Record<NonNullable<LogoProps["size"]>, string> = {
	sm: "size-6",
	md: "size-7",
	lg: "size-8",
};

/**
 * QueryForge brand lockup. The mark reads as a `[ > ]` query prompt — a nod to
 * the project's SQL roots — set on the accent color.
 */
export function Logo({ className, markOnly = false, size = "md" }: LogoProps) {
	return (
		<span className={cn("inline-flex items-center gap-2.5", className)}>
			<span
				className={cn(
					"grid place-items-center rounded-lg bg-accent text-accent-foreground shadow-sm",
					markSize[size],
				)}
				aria-hidden="true"
			>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					className="size-[62%]"
					stroke="currentColor"
					strokeWidth={2.4}
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<title>QueryForge</title>
					<path d="M8 8l4 4-4 4" />
					<path d="M14 16h3" />
				</svg>
			</span>
			{!markOnly && (
				<span
					className={cn(
						"font-mono font-semibold tracking-tight text-foreground",
						wordmarkSize[size],
					)}
				>
					Query<span className="text-muted">Forge</span>
				</span>
			)}
		</span>
	);
}
