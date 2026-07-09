import { cn } from "@heroui/react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Logo } from "#/frontend/components/ui/logo";
import { ThemeToggle } from "#/frontend/components/ui/theme-toggle";

export const Route = createFileRoute("/_auth-layout")({
	component: AuthLayout,
});

function AuthLayout() {
	return (
		<div className="relative flex min-h-screen flex-col bg-background">
			{/* Atmospheric wash behind the auth card */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 overflow-hidden"
			>
				<div className="absolute -top-40 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
			</div>

			<header className="relative z-10 flex items-center justify-between px-6 py-5">
				<Link to="/" aria-label="QueryForge home">
					<Logo />
				</Link>
				<div className="flex items-center gap-1.5">
					<ThemeToggle />
					<Link
						to="/"
						className={cn(
							"flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground",
						)}
					>
						<ArrowLeft className="size-4" />
						Back home
					</Link>
				</div>
			</header>

			<main className="relative z-10 flex flex-1 items-center justify-center px-6 py-10">
				<div className="w-full max-w-md">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
